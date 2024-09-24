import React, { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import avatarDefault from "../../../public/images/noavatar.jpg";
import { RiLockPasswordLine } from "react-icons/ri";
import { SiCoursera } from "react-icons/si"
import { AiOutlineLogout } from 'react-icons/ai';
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import toast from 'react-hot-toast';
import { server } from '@/server';

type Props = {
  user: any;
  active: number;
  avatar: string | null;
  setActive: (active: number) => void;
  logOutHandler: any; 
}

const SideBarProfile:FC<Props> = ({user, active, avatar, setActive }) => {
  const router = useRouter();

  const logOutHandler = async () => {
    try {
      Cookies.remove("userId");
      Cookies.remove("user_token");
      const response = await fetch(`${server}/api/v1/logout`, {
        method: "GET",
      });

      console.log(response.status === 200 ? "Logged Out!" : "Problem Occured!");
      if (response.status === 200) {
        toast.success("Logged Out Successfully!");
        router.push("/");
      }
    } catch (err) {
      console.error("Error during logout:", err);
    }
  };

  return (
    <div className="w-full">
      <div className={`w-full flex items-center px-3 py-4 cursor-pointer ${active === 1 ? "dark:bg-slate-800 bg-white" : "bg-transparent"}`} onClick={() => setActive(1)}>
        <Image 
          src={user.avatar || avatar ? user.avatar.url || avatar : avatarDefault} 
          alt=""
          width={20}
          height={20}
          className="w-[20px] h-[20px] 800px:w-[30px] 800px:h-[30px] cursor-pointer rounded-full"
        />
        <h5 className="pl-2 800px:block hidden font-Poppins dark:text-white text-black">
          My Account
        </h5>
      </div>
      <div className={`w-full flex items-center px-3 py-4 cursor-pointer ${active === 2 ? "dark:bg-slate-800 bg-white" : "bg-transparent"}`} onClick={() => setActive(2)}>
        <RiLockPasswordLine size={20} className="dark:text-white text-black" />
        <h5 className="pl-2 800px:block hidden font-Poppins dark:text-white text-black">
          Change Password
        </h5>
      </div>
      <div className={`w-full flex items-center px-3 py-4 cursor-pointer ${active === 3 ? "dark:bg-slate-800 bg-white" : "bg-transparent"}`} onClick={() => setActive(3)}>
        <SiCoursera size={20} className="dark:text-white text-black" />
        <h5 className="pl-2 800px:block hidden font-Poppins dark:text-white text-black">
          Enrolled Courses
        </h5>
      </div>
      {
        user.role === "admin" && (
          <Link className={`w-full flex items-center px-3 py-4 cursor-pointer ${active === 6 ? "dark:bg-slate-800 bg-white" : "bg-transparent"}`} href={"/admin"}>
              <MdOutlineAdminPanelSettings size={20} className="dark:text-white text-black" />
              <h5 className="pl-2 800px:block hidden font-Poppins dark:text-white text-black">
                Admin Dashboard
              </h5>
          </Link>
        )
      }
      <div className={`w-full flex items-center px-3 py-4 cursor-pointer ${active === 4 ? "dark:bg-slate-800 bg-white" : "bg-transparent"}`} onClick={() => logOutHandler()}>
        <AiOutlineLogout size={20} className="dark:text-white text-black" />
        <h5 className="pl-2 800px:block hidden font-Poppins dark:text-white text-black">
          Log Out
        </h5>
      </div>
    </div>
  )
}

export default SideBarProfile