"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const API_KATEGORI = `${process.env.NEXT_PUBLIC_KATEGORI_API}/api/kategori`;

export default function TambahKategoriPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    nama: "",
    slug: "",
  });

  // auto generate slug
  const generateSlug = (text: string) =>
    text
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "");

  // handle input
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      const payload = {
        nama: formData.nama,
        nama_filter: generateSlug(formData.nama),
      };

      const res = await fetch(API_KATEGORI, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Gagal menambah kategori");
      }

      toast.success("Kategori berhasil ditambahkan!");

      router.push("/kategori");
    } catch (error) {
      console.error(error);
      toast.error("Gagal menyimpan kategori");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-xl bg-white p-6 shadow">
      <h1 className="mb-2 text-3xl font-bold">
        Tambah Kategori
      </h1>

      <p className="mb-6 text-gray-500">
        Tambahkan kategori wisata baru
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

        {/* Slug (auto dari nama) */}
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
            {loading ? "Menyimpan..." : "Simpan"}
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