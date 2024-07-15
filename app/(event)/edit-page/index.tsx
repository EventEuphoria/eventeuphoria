// app/(event)/edit-page.tsx
"use client";

import ButtonDashboard from "@/components/Button/ButtonDashboard";
import ProtectedRouteDashboard from "@/components/ProtectedRouteDashboard";
import useEvent from "@/hooks/useEvent";
import { EventValues } from "@/types/datatypes";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import FormEvent from "../components/FormEvent/FormEvent";

const EditEvent: React.FC = () => {
  const { getEvent, updateEvent } = useEvent();
  const [initialValues, setInitialValues] = useState<EventValues | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const params = useParams();
  const id = Number(params.id);

  useEffect(() => {
    if (!id) return;
    const fetchEvent = async () => {
      const event = await getEvent(id);
      if (event) {
        setInitialValues({
          name: event.name,
          description: event.description,
          date: event.date,
          time: event.time,
          location: event.location,
          city: event.city,
          eventType: event.eventType,
          category: event.category,
          ticketTiers: event.ticketTiers || [{ name: "", price: 0, totalSeats: 0 }],
          eventVouchers: event.eventVouchers || [],
          referralQuota: event.referralQuota || 0,
        });
      }
      setLoading(false);
    };
    fetchEvent();
  }, [id, getEvent]);

  const handleSubmit = async (values: EventValues) => {
    if (!id) return;
    const result = await updateEvent(id, values);
    if (result) {
      alert("Event updated successfully!");
      router.push("/my-event");
    } else {
      alert("Failed to update event. Please try again.");
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }
  return initialValues ? (
    <ProtectedRouteDashboard route="edit-event">
      <div className="flex items-center justify-center m-auto p-5 w-full">
        <div className="flex flex-col max-w-[800px]">
          <div className="">
            <ButtonDashboard>
              <Link href="/my-event" className="flex items-center">
                <FaArrowLeft className="mr-2" /> Back
              </Link>
            </ButtonDashboard>
            <h1 className="font-bold text-head3 mt-4">Edit Event</h1>
          </div>
          <FormEvent initialValues={initialValues} onSubmit={handleSubmit} />
        </div>
      </div>
    </ProtectedRouteDashboard>
  ) : (
    <p>Event not found.</p>
  );
};

export default EditEvent;