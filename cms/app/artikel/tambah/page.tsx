"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface Kategori {
  id: string;
  nama: string;
}

export default function TambahArtikelPage() {
  const router = useRouter();

  const [kategori, setKategori] = useState<Kategori[]>([]);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    excerpt: "",
    content: "",
    categoryId: "",
    thumbnailId: "",
    author: "",
    featured: false,
    status: "DRAFT",
  });

  // Ambil kategori
  useEffect(() => {
    const getKategori = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_KATEGORI_API}/api/kategori`
        );

        const result = await res.json();

        setKategori(result.data);
      } catch (error) {
        console.error(error);
        toast.error("Gagal mengambil kategori");
      }
    };

    getKategori();
  }, []);

  // Handle input
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement |
      HTMLTextAreaElement |
      HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  // Submit
  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_ARTICLE_API}/api/article`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      if (!res.ok) {
        throw new Error();
      }

      toast.success("Artikel berhasil ditambahkan");

      router.push("/artikel");

    } catch (error) {
      console.error(error);

      toast.error("Gagal menambahkan artikel");

    } finally {
      setLoading(false);
    }
  };


  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 bg-white p-6 rounded-xl shadow"
    >
      {/* Judul */}
      <div>
        <label>Judul</label>
        <input
          name="title"
          className="w-full border p-2 rounded"
          onChange={handleChange}
        />
      </div>

      {/* Ringkasan */}
      <div>
        <label>Ringkasan</label>
        <textarea
          name="excerpt"
          className="w-full border p-2 rounded"
          onChange={handleChange}
        />
      </div>

      {/* Isi */}
      <div>
        <label>Isi Artikel</label>
        <textarea
          name="content"
          rows={8}
          className="w-full border p-2 rounded"
          onChange={handleChange}
        />
      </div>


      {/* Kategori */}
      <div>
        <label>Kategori</label>

        <select
          name="categoryId"
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option value="">
            Pilih Kategori
          </option>

          {kategori.map((item) => (
            <option
              key={item.id}
              value={item.id}
            >
              {item.nama}
            </option>
          ))}

        </select>
      </div>


      {/* Thumbnail */}
      <div>
        <label>ID Thumbnail</label>

        <input
          name="thumbnailId"
          className="w-full border p-2 rounded"
          onChange={handleChange}
        />
      </div>


      {/* Penulis */}
      <div>
        <label>Penulis</label>

        <input
          name="author"
          className="w-full border p-2 rounded"
          onChange={handleChange}
        />
      </div>


      {/* Featured */}
      <div className="flex gap-2">

        <input
          type="checkbox"
          onChange={(e) =>
            setForm({
              ...form,
              featured: e.target.checked,
            })
          }
        />

        <label>Artikel Unggulan</label>

      </div>


      {/* Status */}
      <div>

        <label>Status</label>

        <select
          name="status"
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option value="DRAFT">
            Draft
          </option>

          <option value="PUBLISHED">
            Publish
          </option>

        </select>

      </div>


      <button
        disabled={loading}
        className="bg-green-600 text-white px-5 py-2 rounded"
      >
        {loading
          ? "Menyimpan..."
          : "Simpan Artikel"}
      </button>

    </form>
  );
}