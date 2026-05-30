"use client";

import Link from "next/link";
import { Pencil, Trash2 } from "lucide-react";

const destinasi = [
  {
    id: 1,
    nama: "Air Terjun Putri Malu",
    kategori: "Wisata Alam",
    lokasi: "Way Kanan",
    status: "Aktif",
  },
  {
    id: 2,
    nama: "Curup Gangsa",
    kategori: "Wisata Alam",
    lokasi: "Way Kanan",
    status: "Aktif",
  },
  {
    id: 3,
    nama: "Bukit Pemandangan",
    kategori: "Wisata Alam",
    lokasi: "Way Kanan",
    status: "Draft",
  },
];

export default function DestinasiTable() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b">
            <th className="p-3 text-left">Nama</th>
            <th className="p-3 text-left">Kategori</th>
            <th className="p-3 text-left">Lokasi</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-center">Aksi</th>
          </tr>
        </thead>

        <tbody>
          {destinasi.map((item) => (
            <tr key={item.id} className="border-b">
              <td className="p-3">{item.nama}</td>
              <td className="p-3">{item.kategori}</td>
              <td className="p-3">{item.lokasi}</td>

              <td className="p-3">
                <span
                  className={`rounded-full px-3 py-1 text-sm ${
                    item.status === "Aktif"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {item.status}
                </span>
              </td>

              <td className="p-3">
                <div className="flex justify-center gap-3">
                  <Link
                    href={`/destinasi/edit/${item.id}`}
                    className="text-blue-600"
                  >
                    <Pencil size={18} />
                  </Link>

                  <button className="text-red-600">
                    <Trash2 size={18} />
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