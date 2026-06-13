"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

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

  // Ambil data kategori
  useEffect(() => {
    const getKategori = async () => {
      try {
        const res = await fetch(
          "http://localhost:3002/api/kategori"
        );

        const result = await res.json();

        setKategori(result.data);
      } catch (error) {
        console.error("Gagal mengambil data kategori:", error);
        toast.error("Gagal mengambil data kategori");
      } finally {
        setLoading(false);
      }
    };

    getKategori();
  }, []);

  // Hapus kategori
  const handleDelete = async (id: number) => {
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

      setKategori((prev) =>
        prev.filter((item) => item.id !== id)
      );

      toast.success("Kategori berhasil dihapus");
    } catch (error) {
      console.error("Error hapus kategori:", error);
      toast.error("Terjadi kesalahan saat menghapus kategori");
    }
  };

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
          <th className="text-left py-3">
            Nama
          </th>

          <th className="text-left py-3">
            Nama Filter
          </th>

          <th className="text-left py-3">
            Dibuat
          </th>

          <th className="text-center py-3">
            Aksi
          </th>
        </tr>
      </thead>

      <tbody>
        {kategori.length === 0 ? (
          <tr>
            <td
              colSpan={4}
              className="py-6 text-center text-gray-500"
            >
              Belum ada data kategori
            </td>
          </tr>
        ) : (
          kategori.map((item) => (
            <tr
              key={item.id}
              className="border-b hover:bg-gray-50"
            >
              <td className="py-4">
                {item.nama}
              </td>

              <td>
                {item.nama_filter}
              </td>

              <td>
                {new Date(
                  item.createdAt
                ).toLocaleDateString("id-ID", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              </td>

              <td>
                <div className="flex justify-center gap-4">
                  {/* Edit */}
                  <Link
                    href={`/kategori/edit/${item.id}`}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <Pencil size={18} />
                  </Link>

                  {/* Hapus */}
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <button
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 size={18} />
                      </button>
                    </AlertDialogTrigger>

                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Hapus Kategori?
                        </AlertDialogTitle>

                        <AlertDialogDescription>
                          Apakah Anda yakin ingin menghapus kategori
                          <span className="font-semibold">
                            {" "}
                            {item.nama}
                          </span>
                          ? Data yang sudah dihapus tidak dapat
                          dikembalikan.
                        </AlertDialogDescription>
                      </AlertDialogHeader>

                      <AlertDialogFooter>
                        <AlertDialogCancel>
                          Batal
                        </AlertDialogCancel>

                        <AlertDialogAction
                          onClick={() =>
                            handleDelete(item.id)
                          }
                          className="bg-red-600 hover:bg-red-700"
                        >
                          Hapus
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}