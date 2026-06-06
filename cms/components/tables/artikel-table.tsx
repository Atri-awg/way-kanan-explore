"use client";

import Link from "next/link";
import { Pencil, Trash2 } from "lucide-react";

const artikel = [
  {
    id: "1",
    title: "Festival Budaya Way Kanan",
    author: "Admin",
    status: "Publish",
  },
  {
    id: "2",
    title: "10 Destinasi Terbaik di Way Kanan",
    author: "Admin",
    status: "Draft",
  },
];

export default function ArtikelTable() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="p-3 text-left">Judul</th>
            <th className="p-3 text-left">Penulis</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-left">Aksi</th>
          </tr>
        </thead>

        <tbody>
          {artikel.map((item) => (
            <tr key={item.id} className="border-b">
              <td className="p-3">{item.title}</td>

              <td className="p-3">{item.author}</td>

              <td className="p-3">
                <span
                  className={`rounded-full px-3 py-1 text-xs ${
                    item.status === "Publish"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {item.status}
                </span>
              </td>

              <td className="p-3">
                <div className="flex gap-2">
                  <Link
                    href={`/dashboard/artikel/${item.id}/edit`}
                    className="bg-blue-100 text-blue-600 p-2 rounded-lg"
                  >
                    <Pencil size={16} />
                  </Link>

                  <button className="bg-red-100 text-red-600 p-2 rounded-lg">
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}