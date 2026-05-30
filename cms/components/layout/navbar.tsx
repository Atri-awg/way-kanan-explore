"use client";

import {
  Bell,
  Search,
  ChevronDown,
} from "lucide-react";

export default function Navbar() {
  return (
    <header className="h-20 bg-white border-b flex items-center justify-between px-8">
      {/* Left */}
      <div>
        <h1 className="text-xl font-semibold">
          Dashboard
        </h1>
      </div>

      {/* Right */}
      <div className="flex items-center gap-6">
        {/* Search */}
        <div className="relative">
          <input
            type="text"
            placeholder="Cari sesuatu..."
            className="w-72 border rounded-lg py-2 pl-10 pr-4"
          />

          <Search
            size={18}
            className="absolute left-3 top-3 text-gray-400"
          />
        </div>

        {/* Notification */}
        <div className="relative cursor-pointer">
          <Bell size={22} />

          <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            3
          </span>
        </div>

        {/* User */}
        <div className="flex items-center gap-3 cursor-pointer">
          <img
            src="https://i.pravatar.cc/100"
            alt="admin"
            className="w-10 h-10 rounded-full"
          />

          <div>
            <p className="font-medium">
              Admin Waykanan
            </p>

            <p className="text-xs text-gray-500">
              Super Admin
            </p>
          </div>

          <ChevronDown size={18} />
        </div>
      </div>
    </header>
  );
}