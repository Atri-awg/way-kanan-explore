"use client";

import { useRouter } from "next/navigation";

export default function EditKategoriPage() {
  const router = useRouter();

  return (
    <div className="rounded-xl bg-white p-6 shadow">
      <h1 className="mb-2 text-3xl font-bold">
        Tambah Kategori
      </h1>

      <p className="mb-6 text-gray-500">
        Tambahkan kategori wisata baru
      </p>

      <form className="space-y-5">
        <div>
          <label className="mb-2 block font-medium">
            Nama Kategori
          </label>

          <input
            type="text"
            className="w-full rounded-lg border p-3"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Slug
          </label>

          <input
            type="text"
            className="w-full rounded-lg border p-3"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Deskripsi
          </label>

          <textarea
            rows={4}
            className="w-full rounded-lg border p-3"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Icon
          </label>

          <input
            type="text"
            placeholder="contoh: tree-palm"
            className="w-full rounded-lg border p-3"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Status
          </label>

          <select className="w-full rounded-lg border p-3">
            <option>Aktif</option>
            <option>Nonaktif</option>
          </select>
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            className="rounded-lg bg-green-600 px-5 py-3 text-white"
          >
            Simpan
          </button>

          <button
            type="button"
            onClick={() =>
              router.push("/kategori")
            }
            className="rounded-lg bg-gray-200 px-5 py-3"
          >
            Batal
          </button>
        </div>
      </form>
    </div>
  );
}