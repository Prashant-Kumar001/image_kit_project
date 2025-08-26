"use client";

import Link from "next/link";
import { useState } from "react";
import { CiMenuFries } from "react-icons/ci";
import { FiUpload } from "react-icons/fi";
import { IoSettingsSharp } from "react-icons/io5";
import { BiLogOut } from "react-icons/bi";

const AdminSidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="flex h-screen">
      <div
        className={`${
          isOpen ? "w-64" : "w-20"
        }   transition-all border-r-2 border-gray-500 duration-300 flex flex-col`}
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-4  hover:"
        >
          <CiMenuFries />
        </button>

        <nav className="flex-1 px-2 space-y-2">
          <Link
            href="/admin/uploads"
            className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-100"
          >
            <FiUpload />
            {isOpen && <span>Uploads</span>}
          </Link>

          <Link
            href="/admin/settings"
            className="flex items-center gap-3 px-4 py-2 rounded-lg "
          >
            <IoSettingsSharp />
            {isOpen && <span>Settings</span>}
          </Link>
        </nav>

        <div className="px-2 py-4 border-t ">
          <button className="flex items-center gap-3 px-4 py-2 w-full rounded-lg ">
            <BiLogOut />
            {isOpen && <span>Logout</span>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;
