"use client";

import Link from "next/link";
import { Pencil, Trash2 } from "lucide-react";

const kategori = [
  {
    id: "1",
    name: "Wisata Alam",
    slug: "wisata-alam",
    status: true,
  },
  {
    id: "2",
    name: "Pantai",
    slug: "pantai",
    status: true,
  },
  {
    id: "3",
    name: "Budaya",
    slug: "budaya",
    status: false,
  },
];

export default function KategoriTable() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b text-left">
            <th className="p-3">Nama</th>
            <th className="p-3">Slug</th>
            <th className="p-3">Status</th>
            <th className="p-3">Aksi</th>
          </tr>
        </thead>

        <tbody>
          {kategori.map((item) => (
            <tr key={item.id} className="border-b">
              <td className="p-3">{item.name}</td>

              <td className="p-3">{item.slug}</td>

              <td className="p-3">
                <span
                  className={`rounded-full px-3 py-1 text-xs ${
                    item.status
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {item.status ? "Aktif" : "Nonaktif"}
                </span>
              </td>

              <td className="p-3">
                <div className="flex gap-2">
                  <Link
                    href={`/dashboard/kategori/${item.id}/edit`}
                    className="rounded-lg bg-blue-100 p-2 text-blue-600"
                  >
                    <Pencil size={16} />
                  </Link>

                  <button className="rounded-lg bg-red-100 p-2 text-red-600">
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