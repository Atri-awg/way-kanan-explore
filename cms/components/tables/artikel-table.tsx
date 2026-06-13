"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Pencil, Trash2, Star } from "lucide-react";

interface Article {
  id: string;
  title: string;
  author: string | null;
  featured: boolean;
  status: "DRAFT" | "PUBLISHED";
  createdAt: string;
}

export default function ArtikelTable() {
  const [artikel, setArtikel] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getArtikel = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_ARTICLE_API}/api/article`
        );

        if (!res.ok) {
          throw new Error("Gagal mengambil data artikel");
        }

        const result = await res.json();

        setArtikel(result.data);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    getArtikel();
  }, []);

  if (loading) {
    return (
      <div className="py-6 text-center">
        Loading artikel...
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="p-3 text-left">
              Judul
            </th>

            <th className="p-3 text-left">
              Penulis
            </th>

            <th className="p-3 text-center">
              Unggulan
            </th>

            <th className="p-3 text-center">
              Status
            </th>

            <th className="p-3 text-left">
              Dibuat
            </th>

            <th className="p-3 text-center">
              Aksi
            </th>
          </tr>
        </thead>

        <tbody>
          {artikel.length === 0 ? (
            <tr>
              <td
                colSpan={6}
                className="py-6 text-center text-gray-500"
              >
                Belum ada artikel
              </td>
            </tr>
          ) : (
            artikel.map((item) => (
              <tr
                key={item.id}
                className="border-b hover:bg-gray-50"
              >
                {/* Judul */}
                <td className="p-3">
                  {item.title}
                </td>

                {/* Penulis */}
                <td className="p-3">
                  {item.author || "-"}
                </td>

                {/* Featured */}
                <td className="p-3 text-center">
                  {item.featured ? (
                    <Star
                      size={18}
                      className="inline text-yellow-500 fill-yellow-500"
                    />
                  ) : (
                    "-"
                  )}
                </td>

                {/* Status */}
                <td className="p-3 text-center">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      item.status === "PUBLISHED"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {item.status === "PUBLISHED"
                      ? "Publish"
                      : "Draft"}
                  </span>
                </td>

                {/* Tanggal dibuat */}
                <td className="p-3">
                  {new Date(item.createdAt)
                    .toLocaleDateString(
                      "id-ID",
                      {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      }
                    )}
                </td>

                {/* Aksi */}
                <td className="p-3">
                  <div className="flex justify-center gap-3">
                    <Link
                      href={`/artikel/edit/${item.id}`}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <Pencil size={18} />
                    </Link>

                    <button
                      className="text-red-500 hover:text-red-700"
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
    </div>
  );
}