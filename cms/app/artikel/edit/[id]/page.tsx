"use client";

import { useRouter } from "next/navigation";

export default function EditArtikelPage() {
  const router = useRouter();

  return (
    <div className="rounded-xl bg-white p-6 shadow">
      <h1 className="mb-2 text-3xl font-bold">
        Edit Artikel
      </h1>

      <p className="mb-6 text-gray-500">
        Edit Artikel
      </p>

      <form className="space-y-5">
        <div>
          <label className="block mb-2 font-medium">
            Judul Artikel
          </label>

          <input
            type="text"
            className="w-full rounded-lg border p-3"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Slug
          </label>

          <input
            type="text"
            className="w-full rounded-lg border p-3"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Thumbnail
          </label>

          <input
            type="file"
            className="w-full rounded-lg border p-3"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Ringkasan
          </label>

          <textarea
            rows={3}
            className="w-full rounded-lg border p-3"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Konten Artikel
          </label>

          <textarea
            rows={10}
            className="w-full rounded-lg border p-3"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Status
          </label>

          <select className="w-full rounded-lg border p-3">
            <option>Draft</option>
            <option>Publish</option>
          </select>
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            className="bg-green-600 text-white px-5 py-3 rounded-lg"
          >
            Simpan Perubahan
          </button>

          <button
            type="button"
            onClick={() => router.push("/artikel")}
            className="bg-gray-200 px-5 py-3 rounded-lg"
          >
            Batal
          </button>
        </div>
      </form>
    </div>
  );
}