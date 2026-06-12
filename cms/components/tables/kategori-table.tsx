"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface Kategori {
  id: number;
  nama: string;
  nama_filter: string;
  createdAt: string;
  updatedAt: string;
}

export default function KategoriTable() {
  const [kategori, setKategori] = useState<Kategori[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getKategori = async () => {
      try {
        const res = await fetch(
          "http://localhost:3002/api/kategori"
        );

        const result = await res.json();
        setKategori(result.data);;
      } catch (error) {
        console.error("Gagal mengambil data kategori:", error);
      } finally {
        setLoading(false);
      }
    };

    getKategori();
  }, []);

  if (loading) {
    return <div className="py-6 text-center">Loading...</div>;
  }

  const handleDelete = async (id: number) => {
    const confirmDelete = confirm(
      "Yakin ingin menghapus kategori ini?"
    );

    if (!confirmDelete) return;

    try {
      const res = await fetch(
        `http://localhost:3002/api/kategori/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!res.ok) {
        toast.error("Gagal menghapus kategori");
        return;
      }

      toast.success("Kategori berhasil dihapus");

      setKategori((prev) =>
        prev.filter((item) => item.id !== id)
      );
    } catch (error) {
      console.error(error);
      toast.error("Terjadi kesalahan");
    }
  };

  return (
    <table className="w-full">
      <thead>
        <tr className="border-b">
          <th className="text-left py-3">Nama</th>
          <th className="text-left py-3">Nama Filter</th>
          <th className="text-left py-3">Created</th>
          <th className="text-center py-3">Aksi</th>
        </tr>
      </thead>

      <tbody>
        {kategori.length === 0 ? (
          <tr>
            <td colSpan={4} className="py-6 text-center text-gray-500">
              Belum ada data kategori
            </td>
          </tr>
        ) : (
          kategori.map((item) => (
            <tr key={item.id} className="border-b">
              <td className="py-4">{item.nama}</td>

              <td>{item.nama_filter}</td>

              <td>
                {new Date(item.createdAt).toLocaleDateString()}
              </td>

              <td>
                <div className="flex justify-center gap-3">
                  <Link
                    href={`/kategori/edit/${item.id}`}
                    className="text-blue-500"
                  >
                    <Pencil size={18} />
                  </Link>

                  <button
                    onClick={() => handleDelete(item.id)}
                    className="text-red-500"
                  >
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