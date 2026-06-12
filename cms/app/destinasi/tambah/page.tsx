"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function TambahDestinasiPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [kategori, setKategori] = useState<any[]>([]);

  useEffect(() => {
    const getKategori = async () => {
      try {
        const res = await fetch("http://localhost:3002/api/kategori");
        const result = await res.json();

        const data = result?.data ?? result;

        setKategori(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error(error);
        setKategori([]); // fallback aman
      }
    };

    getKategori();
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    location: "",
    categoryId: "",
    thumbnail: "",
    status: true,
  });

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "");
  };

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
      setLoading(true);

      const payload = {
        ...formData,
        slug: generateSlug(formData.name),
      };

      console.log("Payload:", payload);

      const res = await fetch(
        "http://localhost:3003/api/destinasi",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const result = await res.json();

      console.log("Response:", result);

      if (!res.ok) {
        throw new Error(
          result.message ||
            "Gagal menambahkan destinasi"
        );
      }

      toast.success(
        "Destinasi berhasil ditambahkan!"
      );

      router.push("/destinasi");
    } catch (error) {
      console.error(error);

      toast.error(
        "Gagal menyimpan destinasi"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      name: "",
      description: "",
      location: "",
      categoryId: "",
      thumbnail: "",
      status: true,
    });
  };

  useEffect(() => {
  const getKategori = async () => {
    try {
      const res = await fetch("http://localhost:3003/api/kategori");
      const result = await res.json();

      setKategori(Array.isArray(result) ? result : result.data);
    } catch (error) {
      console.error("Gagal ambil kategori:", error);
    }
  };

  getKategori();
}, []);

  return (
    <div className="rounded-xl bg-white p-6 shadow">
      <h1 className="mb-2 text-3xl font-bold">
        Tambah Destinasi Wisata
      </h1>

      <p className="mb-6 text-gray-500">
        Tambahkan destinasi wisata baru
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
            <option value="">Pilih Kategori</option>

            {kategori.map((item: any) => (
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
            disabled={loading}
            className="rounded-lg bg-green-600 px-5 py-3 text-white hover:bg-green-700 disabled:opacity-50"
          >
            {loading
              ? "Menyimpan..."
              : "Simpan Destinasi"}
          </button>

          <button
            type="button"
            onClick={handleReset}
            className="rounded-lg bg-gray-200 px-5 py-3 text-gray-700 hover:bg-gray-300"
          >
            Reset
          </button>
          <button
            type="button"
            onClick={() => router.push("/destinasi")}
            className="rounded-lg bg-red-500 px-5 py-3 text-white hover:bg-red-600"
          >
            Batal
          </button>
        </div>
      </form>
    </div>
  );
}