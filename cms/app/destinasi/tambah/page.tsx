"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const API_KATEGORI = `${process.env.NEXT_PUBLIC_KATEGORI_API}/api/kategori`;
const API_DESTINASI = `${process.env.NEXT_PUBLIC_DESTINASI_API}/api/destinasi`;

type Kategori = {
  id: number;
  nama: string;
};

export default function TambahDestinasiPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [kategori, setKategori] = useState<Kategori[]>([]);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    location: "",
    categoryId: "",
    thumbnail: "",
    status: true,
  });

  //  FETCH KATEGORI
  useEffect(() => {
    const fetchKategori = async () => {
      try {
        const res = await fetch(API_KATEGORI);
        const result = await res.json();

        console.log("Kategori API:", result);

        setKategori(result?.data ?? []);
      } catch (error) {
        console.error("Gagal ambil kategori:", error);
        setKategori([]);
      }
    };

    fetchKategori();
  }, []);

  //  handle input
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

  // slug generator
  const generateSlug = (text: string) =>
    text
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "");

  // submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      const payload = {
        ...formData,
        slug: generateSlug(formData.name),
      };

      const res = await fetch(API_DESTINASI, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Gagal menambahkan destinasi");
      }

      toast.success("Destinasi berhasil ditambahkan!");
      router.push("/destinasi");
    } catch (error) {
      console.error(error);
      toast.error("Gagal menyimpan destinasi");
    } finally {
      setLoading(false);
    }
  };

  //  reset form
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

  return (
    <div className="rounded-xl bg-white p-6 shadow">
      <h1 className="mb-2 text-3xl font-bold">
        Tambah Destinasi Wisata
      </h1>

      <p className="mb-6 text-gray-500">
        Tambahkan destinasi wisata baru
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

            {kategori.length > 0 ? (
              kategori.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.nama}
                </option>
              ))
            ) : (
              <option disabled>Loading kategori...</option>
            )}
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
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={5}
            className="w-full rounded-lg border p-3"
            required
          />
        </div>

        {/* Thumbnail */}
        <div>
          <label className="mb-2 block font-medium">
            Thumbnail
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
            disabled={loading}
            className="rounded-lg bg-green-600 px-5 py-3 text-white hover:bg-green-700 disabled:opacity-50"
          >
            {loading ? "Menyimpan..." : "Simpan"}
          </button>

          <button
            type="button"
            onClick={handleReset}
            className="rounded-lg bg-gray-200 px-5 py-3"
          >
            Reset
          </button>

          <button
            type="button"
            onClick={() => router.push("/destinasi")}
            className="rounded-lg bg-red-500 px-5 py-3 text-white"
          >
            Batal
          </button>
        </div>
      </form>
    </div>
  );
}