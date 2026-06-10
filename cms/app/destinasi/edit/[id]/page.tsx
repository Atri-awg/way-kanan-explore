"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";

export default function EditDestinasiPage() {
  
  const params = useParams();
  const router = useRouter();
  const [saving, setSaving] = useState(false);

  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    location: "",
    categoryId: "",
    thumbnail: "",
    status: true,
  });

  useEffect(() => {
  const getDestinasi = async () => {
    try {
      console.log("ID:", params.id);

      const res = await fetch(
        `http://localhost:3003/api/destinasi/${params.id}`
      );

      const result = await res.json();

      console.log("RESULT:", result);

      const data = result.data;

      setFormData({
        name: data.name ?? "",
        description: data.description ?? "",
        location: data.location ?? "",
        categoryId: data.categoryId ?? "",
        thumbnail: data.thumbnail ?? "",
        status: data.status ?? true,
      });
    } catch (error) {
      console.error(error);
    }
  };

  getDestinasi();
}, [params.id]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement |
      HTMLTextAreaElement |
      HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      const res = await fetch(
        `http://localhost:3003/api/destinasi/${params.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!res.ok) {
        throw new Error(
          "Gagal mengubah destinasi"
        );
      }

      toast.success("Destinasi berhasil diperbarui");

      router.push("/destinasi");
    } catch (error) {
      console.error(error);
      alert("Gagal mengubah destinasi");
    }
  };

  return (
    <div className="rounded-xl bg-white p-6 shadow">
      <h1 className="mb-2 text-3xl font-bold">
        Edit Destinasi Wisata
      </h1>

      <p className="mb-6 text-gray-500">
        Edit destinasi wisata
      </p>

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        {/* Nama Destinasi */}
        <div>
          <label className="mb-2 block font-medium">
            Nama Destinasi
          </label>

          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Masukkan nama destinasi"
            className="w-full rounded-lg border p-3"
            required
          />
        </div>

        {/* Kategori */}
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
            <option value="">
              Pilih Kategori
            </option>

            <option value="1">
              Wisata Alam
            </option>

            <option value="2">
              Pantai
            </option>

            <option value="3">
              Budaya
            </option>

            <option value="4">
              Sejarah
            </option>
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
            placeholder="Contoh: Lampung Timur"
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
            placeholder="Masukkan deskripsi destinasi"
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
            placeholder="https://example.com/image.jpg"
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
                status:
                  e.target.value === "true",
              }))
            }
            className="w-full rounded-lg border p-3"
          >
            <option value="true">
              Published
            </option>

            <option value="false">
              Draft
            </option>
          </select>
        </div>

        {/* Tombol */}
        <div className="flex gap-3">
          <button
            type="submit"
            disabled={saving}
            className="rounded-lg bg-green-600 px-5 py-3 text-white hover:bg-green-700 disabled:opacity-50"
          >
            {saving
              ? "Menyimpan..."
              : "Update Destinasi"}
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