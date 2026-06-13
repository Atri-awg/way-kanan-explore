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

const API_DESTINASI = "http://localhost:3003/api/destinasi";
const API_KATEGORI = "http://localhost:3002/api/kategori";

interface Destinasi {
  id: number;
  name: string;
  location: string;
  categoryId: number;
  status: boolean;
}

interface Kategori {
  id: number;
  nama: string;
}

export default function DestinasiTable() {
  const [destinasi, setDestinasi] = useState<Destinasi[]>([]);
  const [kategori, setKategori] = useState<Kategori[]>([]);
  const [loading, setLoading] = useState(true);

  // 🔥 FETCH DESTINASI
  useEffect(() => {
    const getDestinasi = async () => {
      try {
        const res = await fetch(API_DESTINASI);
        const result = await res.json();

        setDestinasi(result?.data ?? result);
      } catch (error) {
        console.error("Gagal mengambil destinasi:", error);
        setDestinasi([]);
      } finally {
        setLoading(false);
      }
    };

    getDestinasi();
  }, []);

  // 🔥 FETCH KATEGORI
  useEffect(() => {
    const getKategori = async () => {
      try {
        const res = await fetch(API_KATEGORI);
        const result = await res.json();

        setKategori(result?.data ?? []);
      } catch (error) {
        console.error("Gagal ambil kategori:", error);
        setKategori([]);
      }
    };

    getKategori();
  }, []);

  const getKategoriName = (id: number | string) => {
    const found = kategori.find(
      (k) => String(k.id) === String(id)
    );

    return found ? found.nama : "-";
  };
  const handleDelete = async (id: number) => {
    try {
      const res = await fetch(`${API_DESTINASI}/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        toast.error("Gagal menghapus destinasi");
        return;
      }

      toast.success("Destinasi berhasil dihapus");

      setDestinasi((prev) =>
        prev.filter((item) => item.id !== id)
      );
    } catch (error) {
      console.error(error);
      toast.error("Gagal menghapus destinasi");
    }
  };

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
            <td colSpan={5} className="py-6 text-center text-gray-500">
              Belum ada data destinasi
            </td>
          </tr>
        ) : (
          destinasi.map((item) => (
            <tr key={item.id} className="border-b">
              <td className="py-4">{item.name}</td>

              {/* 🔥 INI FIX UTAMA */}
              <td>{getKategoriName(item.categoryId)}</td>

              <td>{item.location}</td>

              <td>
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    item.status
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {item.status ? "Published" : "Draft"}
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
                            {item.name}
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