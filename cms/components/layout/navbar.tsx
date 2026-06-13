"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  Bell,
  User,
  Search,
  ChevronDown,
  LogOut,
} from "lucide-react";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const getTitle = () => {
    if (pathname === "/dashboard") return "Dashboard";

    if (pathname === "/destinasi") return "Kelola Destinasi";

    if (pathname === "/destinasi/tambah")
      return "Tambah Destinasi";

    if (pathname.includes("/destinasi/edit"))
      return "Edit Destinasi";

    if (pathname === "/artikel")
      return "Kelola Artikel";

    if (pathname === "/artikel/tambah")
      return "Tambah Artikel";

    if (pathname.includes("/artikel/edit"))
      return "Edit Artikel";

    if (pathname === "/kategori")
      return "Kelola Kategori";

    if (pathname === "/pengguna")
      return "Kelola Pengguna";

    return "Waykanan Explore CMS";
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user");

    router.push("/login");
  };

  return (
    <header className="h-20 bg-white border-b flex items-center justify-between px-8">

      {/* Left */}
      <div>
        <h1 className="text-2xl font-bold">
          {getTitle()}
        </h1>

        <p className="text-sm text-gray-500">
          Content Management System
        </p>
      </div>

      {/* Right */}
      <div className="flex items-center gap-6">

        {/* Search */}
        <div className="relative">
          <input
            type="text"
            placeholder="Cari sesuatu..."
            className="w-72 border rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <Search
            size={18}
            className="absolute left-3 top-3 text-gray-400"
          />
        </div>


        {/* Notification */}
        <div className="relative cursor-pointer">
          <Bell size={22} />
        </div>

        {/* User */}
        <div className="flex items-center gap-3">

          <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
              <User size={20} className="text-gray-500" />
          </div>

          <div>
            <p className="font-medium">
              {user?.name || "Loading..."}
            </p>

            <p className="text-xs text-gray-500">
              {user?.role || "-"}
            </p>
          </div>


          <button
            onClick={handleLogout}
            className="text-red-500 hover:text-red-700"
            title="Logout"
          >
            <LogOut size={18} />
          </button>

        </div>

      </div>
    </header>
  );
}