"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Pencil, Trash2 } from "lucide-react";

interface Destinasi {
  id: number;
  name: string;
  location: string;
  categoryId: string;
  status: boolean;
}

export default function DestinasiTable() {
  const [destinasi, setDestinasi] = useState<Destinasi[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getDestinasi = async () => {
      try {
        const res = await fetch(
          "http://localhost:3003/api/destinasi"
        );

        const result = await res.json();

        setDestinasi(result);
      } catch (error) {
        console.error("Gagal mengambil data:", error);
      } finally {
        setLoading(false);
      }
    };

    getDestinasi();
  }, []);

  if (loading) {
    return (
      <div className="py-6 text-center">
        Loading...
      </div>
    );
  }

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
        {destinasi.length === 0 ? (
          <tr>
            <td
              colSpan={5}
              className="py-6 text-center text-gray-500"
            >
              Belum ada data destinasi
            </td>
          </tr>
        ) : (
          destinasi.map((item) => (
            <tr
              key={item.id}
              className="border-b"
            >
              <td className="py-4">{item.name}</td>

              <td>{item.categoryId}</td>

              <td>{item.location}</td>

              <td>
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    item.status
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {item.status
                    ? "Published"
                    : "Draft"}
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
          ))
        )}
      </tbody>
    </table>
  );
}