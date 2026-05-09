import {
  LayoutDashboard,
  FileText,
  MapPinned,
  Image,
  Video,
  Users,
  Settings,
} from "lucide-react";

export default function Sidebar() {
  return (
    <div className="w-64 h-screen bg-gray-600 text-white p-5 fixed">
      <h1 className="text-2xl font-bold mb-10">
        Waykanan Explorer
      </h1>

      <ul className="space-y-4">
        <li className="flex items-center gap-3 hover:text-gray-300 cursor-pointer">
          <LayoutDashboard size={20} />
          Dashboard
        </li>

        <li className="flex items-center gap-3 hover:text-gray-300 cursor-pointer">
          <FileText size={20} />
          Artikel
        </li>

        <li className="flex items-center gap-3 hover:text-gray-300 cursor-pointer">
          <MapPinned size={20} />
          Destinasi
        </li>

        <li className="flex items-center gap-3 hover:text-gray-300 cursor-pointer">
          <Image size={20} />
          Galeri
        </li>

        <li className="flex items-center gap-3 hover:text-gray-300 cursor-pointer">
          <Video size={20} />
          Video
        </li>

        <li className="flex items-center gap-3 hover:text-gray-300 cursor-pointer">
          <Users size={20} />
          Pengguna
        </li>

        <li className="flex items-center gap-3 hover:text-gray-300 cursor-pointer">
          <Settings size={20} />
          Pengaturan
        </li>
      </ul>
    </div>
  );
}