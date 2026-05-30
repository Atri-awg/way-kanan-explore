"use client";

import Link from "next/link";
import { Pencil, Trash2 } from "lucide-react";

const destinasi = [
  {
    id: 1,
    nama: "Air Terjun Putri Malu",
    kategori: "Wisata Alam",
    lokasi: "Way Kanan",
    status: "Published",
  },
  {
    id: 2,
    nama: "Curup Gangsa",
    kategori: "Wisata Alam",
    lokasi: "Kasui",
    status: "Published",
  },
  {
    id: 3,
    nama: "Bukit Pemandangan",
    kategori: "Wisata Alam",
    lokasi: "Banjit",
    status: "Draft",
  },
];

export default function DestinasiTable() {
  return (
    <table className="w-full">
      <thead>
        <tr className="border-b">
          <th className="text-left py-3">Nama</th>
          <th className="text-left py-3">Kategori</th>
          <th className="text-left py-3">Lokasi</th>
          <th className="text-left py-3">Status</th>
          <th className="text-center py-3">Aksi</th>
        </tr>
      </thead>

      <tbody>
        {destinasi.map((item) => (
          <tr key={item.id} className="border-b">
            <td className="py-4">{item.nama}</td>

            <td>{item.kategori}</td>

            <td>{item.lokasi}</td>

            <td>
              <span
                className={`px-3 py-1 rounded-full text-sm ${
                  item.status === "Published"
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {item.status}
              </span>
            </td>

            <td>
              <div className="flex justify-center gap-3">
                <Link
                  href={`/destinasi/edit/${item.id}`}
                  className="text-blue-500"
                >
                  <Pencil size={18} />
                </Link>

                <button className="text-red-500">
                  <Trash2 size={18} />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}