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
          "http://localhost:3005/api/articles"
        );

        const result = await res.json();

        setArtikel(result.data);
      } catch (error) {
        console.error("Gagal mengambil artikel:", error);
      } finally {
        setLoading(false);
      }
    };

    getArtikel();
  }, []);

  if (loading) {
    return (
      <div className="py-6 text-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="text-left py-3">
              Judul
            </th>

            <th className="text-left py-3">
              Penulis
            </th>

            <th className="text-center py-3">
              Unggulan
            </th>

            <th className="text-center py-3">
              Status
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
                <td className="py-4">
                  {item.title}
                </td>

                {/* Author */}
                <td>
                  {item.author || "-"}
                </td>

                {/* Featured */}
                <td className="text-center">
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
                <td className="text-center">
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

                {/* Created */}
                <td>
                  {new Date(
                    item.createdAt
                  ).toLocaleDateString("id-ID", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                </td>

                {/* Action */}
                <td>
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