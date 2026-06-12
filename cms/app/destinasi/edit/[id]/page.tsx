"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";

const API_DESTINASI = "http://localhost:3003/api/destinasi";
const API_KATEGORI = "http://localhost:3002/api/kategori";

type Kategori = {
  id: number;
  nama: string;
};

export default function EditDestinasiPage() {
  const params = useParams();
  const router = useRouter();

  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  const [kategori, setKategori] = useState<Kategori[]>([]);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    location: "",
    categoryId: "",
    thumbnail: "",
    status: true,
  });

  // 🔥 FETCH DETAIL DESTINASI
  useEffect(() => {
    const getDestinasi = async () => {
      try {
        const res = await fetch(`${API_DESTINASI}/${params.id}`);
        const result = await res.json();

        const data = result?.data;

        setFormData({
          name: data?.name ?? "",
          description: data?.description ?? "",
          location: data?.location ?? "",
          categoryId: String(data?.categoryId ?? ""),
          thumbnail: data?.thumbnail ?? "",
          status: data?.status ?? true,
        });
      } catch (error) {
        console.error(error);
        toast.error("Gagal mengambil data destinasi");
      } finally {
        setLoading(false);
      }
    };

    if (params.id) getDestinasi();
  }, [params.id]);

  // 🔥 FETCH KATEGORI (SAMA SEPERTI TAMBAH PAGE)
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

  // 🔥 HANDLE INPUT
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

  // 🔥 SUBMIT UPDATE
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setSaving(true);

      const res = await fetch(`${API_DESTINASI}/${params.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Gagal update destinasi");
      }

      toast.success("Destinasi berhasil diperbarui");
      router.push("/destinasi");
    } catch (error) {
      console.error(error);
      toast.error("Gagal mengubah destinasi");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="py-10 text-center">Loading...</div>;
  }

  return (
    <div className="rounded-xl bg-white p-6 shadow">
      <h1 className="mb-2 text-3xl font-bold">
        Edit Destinasi Wisata
      </h1>

      <p className="mb-6 text-gray-500">
        Edit destinasi wisata
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">

        {/* Nama */}
        <div>
          <label className="mb-2 block font-medium">
            Nama Destinasi
          </label>

          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full rounded-lg border p-3"
            required
          />
        </div>

        {/* KATEGORI (FIXED - NO HARDCODE) */}
        <div>
          <label className="mb-2 block font-medium">
            Kategori
          </label>

          <select
            name="categoryId"
            value={formData.categoryId}
            onChange={handleChange}
            className="w-full rounded-lg border p-3"
            required
          >
            <option value="">Pilih Kategori</option>

            {kategori.map((item) => (
              <option key={item.id} value={item.id}>
                {item.nama}
              </option>
            ))}
          </select>
        </div>

        {/* Lokasi */}
        <div>
          <label className="mb-2 block font-medium">
            Lokasi
          </label>

          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full rounded-lg border p-3"
            required
          />
        </div>

        {/* Deskripsi */}
        <div>
          <label className="mb-2 block font-medium">
            Deskripsi
          </label>

          <textarea
            rows={5}
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full rounded-lg border p-3"
            required
          />
        </div>

        {/* Thumbnail */}
        <div>
          <label className="mb-2 block font-medium">
            URL Thumbnail
          </label>

          <input
            type="text"
            name="thumbnail"
            value={formData.thumbnail}
            onChange={handleChange}
            className="w-full rounded-lg border p-3"
          />
        </div>

        {/* Status */}
        <div>
          <label className="mb-2 block font-medium">
            Status
          </label>

          <select
            value={String(formData.status)}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                status: e.target.value === "true",
              }))
            }
            className="w-full rounded-lg border p-3"
          >
            <option value="true">Published</option>
            <option value="false">Draft</option>
          </select>
        </div>

        {/* BUTTON */}
        <div className="flex gap-3">
          <button
            type="submit"
            disabled={saving}
            className="rounded-lg bg-green-600 px-5 py-3 text-white hover:bg-green-700 disabled:opacity-50"
          >
            {saving ? "Menyimpan..." : "Update Destinasi"}
          </button>

          <button
            type="button"
            onClick={() => router.push("/destinasi")}
            className="rounded-lg bg-gray-300 px-5 py-3 text-gray-700 hover:bg-gray-400"
          >
            Batal
          </button>
        </div>

      </form>
    </div>
  );
}