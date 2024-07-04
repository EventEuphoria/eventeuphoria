import Image from "next/image";
import userImg from "@/public/assets/user.png";
import Link from "next/link";
import Sections from "./components/Sections";

const ProfilePage: React.FC = () => {
  return (
    <>
      <div className="flex flex-col gap-5 p-5 lg:p-10">
        <div className="flex gap-5 items-center ">
          <Image
            src={userImg}
            alt="user"
            width={70}
            height={80}
            className="rounded-full shadow-boxed object-contain object-center border-2"
          />
          <div className=" flex flex-col gap-2">
            <h3 className="font-bold text-tXl">Nur Rizki Amalia</h3>
            <p className="text-sm">"I love party."</p>
            <Link
              href=""
              className=" w-fit py-1 px-3 rounded-md text-dspLightGray border border-dspLightGray hover:bg-dspLightGray hover:text-white "
            >
              Edit Profile
            </Link>
          </div>
        </div>
        <hr />
        <div>
          <Sections />
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
