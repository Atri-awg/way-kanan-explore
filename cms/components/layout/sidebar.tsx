"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  MapPin,
  Image,
  Video,
  Tag,
  MessageSquare,
  Users,
  Settings,
  Database,
  Clock3,
  Globe,
  Menu,
} from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-72 bg-[#0F4C3A] text-white min-h-screen flex flex-col">
      {/* Logo */}
      <div className="h-24 flex items-center justify-center border-b border-green-800">
        <h1 className="text-3xl font-bold italic">
          Waykanan Explore
        </h1>
      </div>

      {/* Menu */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <p className="text-xs text-green-200 mb-3 uppercase">
          Konten
        </p>

        <MenuItem
          icon={<LayoutDashboard size={18} />}
          href="/dashboard"
          label="Dashboard"
          active={pathname === "/dashboard"}
        />

        <MenuItem
          icon={<FileText size={18} />}
          href="/artikel"
          label="Artikel"
          active={pathname.startsWith("/artikel")}
        />

        <MenuItem
          icon={<MapPin size={18} />}
          href="/destinasi"
          label="Destinasi"
          active={pathname.startsWith("/destinasi")}
        />

        <MenuItem
          icon={<Image size={18} />}
          href="/galeri"
          label="Galeri"
          active={pathname.startsWith("/galeri")}
        />

        <MenuItem
          icon={<Video size={18} />}
          href="/video"
          label="Video"
          active={pathname.startsWith("/video")}
        />

        <MenuItem
          icon={<Tag size={18} />}
          href="/kategori"
          label="Kategori"
          active={pathname.startsWith("/kategori")}
        />

        <MenuItem
          icon={<MessageSquare size={18} />}
          href="/komentar"
          label="Komentar"
          active={pathname.startsWith("/komentar")}
        />

        <p className="text-xs text-green-200 mt-8 mb-3 uppercase">
          Pengaturan
        </p>

        <MenuItem
          icon={<Globe size={18} />}
          href="/banner"
          label="Banner"
          active={pathname.startsWith("/banner")}
        />

        <MenuItem
          icon={<Menu size={18} />}
          href="/menu"
          label="Menu"
          active={pathname.startsWith("/menu")}
        />

        <MenuItem
          icon={<Users size={18} />}
          href="/pengguna"
          label="Pengguna"
          active={pathname.startsWith("/pengguna")}
        />

        <p className="text-xs text-green-200 mt-8 mb-3 uppercase">
          Sistem
        </p>

        <MenuItem
          icon={<Settings size={18} />}
          href="/website"
          label="Pengaturan Website"
          active={pathname.startsWith("/website")}
        />

        <MenuItem
          icon={<Database size={18} />}
          href="/backup"
          label="Backup"
          active={pathname.startsWith("/backup")}
        />

        <MenuItem
          icon={<Clock3 size={18} />}
          href="/aktivitas"
          label="Log Aktivitas"
          active={pathname.startsWith("/aktivitas")}
        />
      </div>

      <div className="p-4 border-t border-green-800">
        <button className="w-full border border-green-600 rounded-lg py-3 hover:bg-green-800 transition">
          Lihat Website
        </button>
      </div>
    </aside>
  );
}

function MenuItem({
  icon,
  href,
  label,
  active = false,
}: {
  icon: React.ReactNode;
  href: string;
  label: string;
  active?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 px-4 py-3 rounded-xl mb-2 transition ${
        active
          ? "bg-green-700 text-white"
          : "hover:bg-green-800 text-green-100"
      }`}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
}