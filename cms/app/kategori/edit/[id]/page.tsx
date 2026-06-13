"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { toast } from "sonner";

const API_KATEGORI = "http://localhost:3002/api/kategori";

export default function EditKategoriPage() {
  const router = useRouter();
  const params = useParams();

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  const [formData, setFormData] = useState({
    nama: "",
  });

  // slug generator
  const generateSlug = (text: string) =>
    text
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "");

  // ambil data detail kategori
  useEffect(() => {
    const getKategori = async () => {
      try {
        const res = await fetch(
          `${API_KATEGORI}/${params.id}`
        );

        const result = await res.json();

        const data = result?.data ?? result;

        setFormData({
          nama: data.nama ?? "",
        });
      } catch (error) {
        console.error("Gagal ambil kategori:", error);
        toast.error("Gagal memuat data kategori");
      } finally {
        setFetching(false);
      }
    };

    if (params.id) getKategori();
  }, [params.id]);

  // handle input
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // submit update
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      const payload = {
        nama: formData.nama,
        nama_filter: generateSlug(formData.nama),
      };

      const res = await fetch(
        `${API_KATEGORI}/${params.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Gagal update kategori");
      }

      toast.success("Kategori berhasil diperbarui!");

      router.push("/kategori");
    } catch (error) {
      console.error(error);
      toast.error("Gagal menyimpan perubahan");
    } finally {
      setLoading(false);
    }
  };

  // loading state
  if (fetching) {
    return (
      <div className="p-6 text-center">
        Loading data kategori...
      </div>
    );
  }

  return (
    <div className="rounded-xl bg-white p-6 shadow">
      <h1 className="mb-2 text-3xl font-bold">
        Edit Kategori
      </h1>

      <p className="mb-6 text-gray-500">
        Edit kategori wisata
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">

        {/* Nama */}
        <div>
          <label className="mb-2 block font-medium">
            Nama Kategori
          </label>

          <input
            type="text"
            name="nama"
            value={formData.nama}
            onChange={handleChange}
            className="w-full rounded-lg border p-3"
            required
          />
        </div>

        {/* Slug */}
        <div>
          <label className="mb-2 block font-medium">
            Slug
          </label>

          <input
            type="text"
            value={generateSlug(formData.nama)}
            disabled
            className="w-full rounded-lg border p-3 bg-gray-100"
          />
        </div>

        {/* BUTTON */}
        <div className="flex gap-3">
          <button
            type="submit"
            disabled={loading}
            className="rounded-lg bg-green-600 px-5 py-3 text-white hover:bg-green-700 disabled:opacity-50"
          >
            {loading ? "Menyimpan..." : "Simpan Perubahan"}
          </button>

          <button
            type="button"
            onClick={() => router.push("/kategori")}
            className="rounded-lg bg-gray-200 px-5 py-3"
          >
            Batal
          </button>
        </div>

      </form>
    </div>
  );
}