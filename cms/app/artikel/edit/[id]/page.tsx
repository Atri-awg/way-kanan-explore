"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";

interface Kategori {
  id: string;
  nama: string;
}

export default function EditArtikelPage() {
  const { id } = useParams();
  const router = useRouter();

  const [kategori, setKategori] = useState<Kategori[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

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


  // Ambil artikel & kategori
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [artikelRes, kategoriRes] = await Promise.all([
          fetch(
            `${process.env.NEXT_PUBLIC_ARTICLE_API}/api/article/${id}`
          ),
          fetch(
            `${process.env.NEXT_PUBLIC_KATEGORI_API}/api/kategori`
          )
        ]);

        if (!artikelRes.ok) {
          throw new Error("Artikel tidak ditemukan");
        }

        const artikelResult = await artikelRes.json();
        const kategoriResult = await kategoriRes.json();

        setForm({
          title: artikelResult.data.title,
          excerpt: artikelResult.data.excerpt || "",
          content: artikelResult.data.content,
          categoryId: artikelResult.data.categoryId,
          thumbnailId: artikelResult.data.thumbnailId || "",
          author: artikelResult.data.author || "",
          featured: artikelResult.data.featured,
          status: artikelResult.data.status,
        });

        setKategori(kategoriResult.data);

      } catch (error) {
        console.error(error);
        toast.error("Gagal mengambil data artikel");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);


  // Handle input biasa
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement |
      HTMLTextAreaElement |
      HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  // Submit update
  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    setSaving(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_ARTICLE_API}/api/article/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      if (!res.ok) {
        throw new Error("Gagal update");
      }

      toast.success("Artikel berhasil diperbarui");

      router.push("/artikel");

    } catch (error) {
      console.error(error);
      toast.error("Gagal memperbarui artikel");

    } finally {
      setSaving(false);
    }
  };


  if (loading) {
    return (
      <div className="text-center py-6">
        Loading artikel...
      </div>
    );
  }


  return (
    <div className="bg-white rounded-xl shadow p-6">
      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >

        {/* Judul */}
        <div>
          <label className="block mb-2">
            Judul
          </label>

          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
        </div>


        {/* Ringkasan */}
        <div>
          <label className="block mb-2">
            Ringkasan
          </label>

          <textarea
            name="excerpt"
            value={form.excerpt}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
        </div>


        {/* Isi Artikel */}
        <div>
          <label className="block mb-2">
            Isi Artikel
          </label>

          <textarea
            name="content"
            rows={8}
            value={form.content}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
        </div>


        {/* Kategori */}
        <div>
          <label className="block mb-2">
            Kategori
          </label>

          <select
            name="categoryId"
            value={form.categoryId}
            onChange={handleChange}
            className="w-full border rounded p-2"
          >
            <option value="">
              Pilih kategori
            </option>

            {
              kategori.map((item) => (
                <option
                  key={item.id}
                  value={item.id}
                >
                  {item.nama}
                </option>
              ))
            }
          </select>
        </div>


        {/* Thumbnail */}
        <div>
          <label className="block mb-2">
            Thumbnail ID
          </label>

          <input
            name="thumbnailId"
            value={form.thumbnailId}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
        </div>


        {/* Author */}
        <div>
          <label className="block mb-2">
            Penulis
          </label>

          <input
            name="author"
            value={form.author}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
        </div>


        {/* Featured */}
        <div className="flex gap-2 items-center">

          <input
            type="checkbox"
            checked={form.featured}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                featured: e.target.checked
              }))
            }
          />

          <label>
            Artikel Unggulan
          </label>

        </div>


        {/* Status */}
        <div>
          <label className="block mb-2">
            Status
          </label>

          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full border rounded p-2"
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
          disabled={saving}
          className="bg-blue-600 text-white px-5 py-2 rounded"
        >
          {
            saving
              ? "Menyimpan..."
              : "Update Artikel"
          }
        </button>

      </form>
    </div>
  );
}