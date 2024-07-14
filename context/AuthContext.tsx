"use client";

import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import apiClient from '@/services/apiClient';
import { User } from '@/types/datatypes';

const TOKEN_KEY = 'jwtToken';

interface AuthContextType {
  isAuthenticated: boolean;
  currentUser: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, firstName: string, lastName: string, password: string, role: string, referralCode?: string) => Promise<void>;
  logout: () => void;
  getToken: () => string | null;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const token = getToken();
    if (token) {
      fetchProfile(token);
    } else {
      setIsLoading(false);
    }
  }, []);

  const fetchProfile = async (token: string) => {
    try {
      const response = await apiClient.get(`/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCurrentUser(response.data.data);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Failed to fetch user profile:', error);
      setIsAuthenticated(false);
      removeToken();
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await apiClient.post(`/login`, { email, password });
      const { token } = response.data;
      setToken(token);
      await fetchProfile(token);
      router.push('/');
    } catch (error) {
      console.error('Login failed:', error);
      throw new Error('Failed to login');
    }
  };

  const register = async (email: string, firstName: string, lastName: string, password: string, role: string, referralCode?: string) => {
    try {
      await apiClient.post(`/register`, { email, firstName, lastName, password, role, referralCode });
      router.push('/login');
    } catch (error) {
      console.error('Registration failed:', error);
      throw new Error('Failed to register');
    }
  };

  const logout = async () => {
    const token = getToken();
    if (token) {
      try {
        await apiClient.post(`/logout`, {}, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } catch (error) {
        console.error('Logout failed:', error);
      } finally {
        removeToken();
        setIsAuthenticated(false);
        setCurrentUser(null);
        router.push('/login');
      }
    }
  };

  const getToken = () => localStorage.getItem(TOKEN_KEY);

  const setToken = (token: string) => localStorage.setItem(TOKEN_KEY, token);

  const removeToken = () => localStorage.removeItem(TOKEN_KEY);

  return (
    <AuthContext.Provider value={{ isAuthenticated, currentUser, login, register, logout, getToken, isLoading }}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};