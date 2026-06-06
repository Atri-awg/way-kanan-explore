"use client";

import { useState } from "react";

export default function EditDestinasiPage() {
  const [formData, setFormData] = useState({
    nama: "Way Kambas",
    lokasi: "Lampung Timur",
    kategori: "Wisata Alam",
    deskripsi:
      "Taman Nasional Way Kambas merupakan kawasan konservasi gajah di Lampung.",
    jamOperasional: "08:00 - 17:00",
    hargaTiket: "50000",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Data destinasi diperbarui:", formData);

    alert("Destinasi berhasil diperbarui!");
  };

  return (
    <div className="rounded-xl bg-white p-6 shadow">
      <h1 className="mb-6 text-2xl font-bold text-gray-800">
        Edit Destinasi Wisata
      </h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Nama Destinasi */}
        <div>
          <label className="mb-2 block font-medium">
            Nama Destinasi
          </label>
          <input
            type="text"
            name="nama"
            value={formData.nama}
            onChange={handleChange}
            className="w-full rounded-lg border p-3"
          />
        </div>

        {/* Lokasi */}
        <div>
          <label className="mb-2 block font-medium">
            Lokasi
          </label>
          <input
            type="text"
            name="lokasi"
            value={formData.lokasi}
            onChange={handleChange}
            className="w-full rounded-lg border p-3"
          />
        </div>

        {/* Kategori */}
        <div>
          <label className="mb-2 block font-medium">
            Kategori
          </label>
          <select
            name="kategori"
            value={formData.kategori}
            onChange={handleChange}
            className="w-full rounded-lg border p-3"
          >
            <option>Wisata Alam</option>
            <option>Pantai</option>
            <option>Budaya</option>
            <option>Sejarah</option>
          </select>
        </div>

        {/* Deskripsi */}
        <div>
          <label className="mb-2 block font-medium">
            Deskripsi
          </label>
          <textarea
            rows={5}
            name="deskripsi"
            value={formData.deskripsi}
            onChange={handleChange}
            className="w-full rounded-lg border p-3"
          />
        </div>

        {/* Jam Operasional */}
        <div>
          <label className="mb-2 block font-medium">
            Jam Operasional
          </label>
          <input
            type="text"
            name="jamOperasional"
            value={formData.jamOperasional}
            onChange={handleChange}
            className="w-full rounded-lg border p-3"
          />
        </div>

        {/* Harga Tiket */}
        <div>
          <label className="mb-2 block font-medium">
            Harga Tiket
          </label>
          <input
            type="number"
            name="hargaTiket"
            value={formData.hargaTiket}
            onChange={handleChange}
            className="w-full rounded-lg border p-3"
          />
        </div>

        {/* Upload Gambar */}
        <div>
          <label className="mb-2 block font-medium">
            Ganti Gambar
          </label>
          <input
            type="file"
            className="w-full rounded-lg border p-3"
          />
        </div>

        {/* Tombol */}
        <div className="flex gap-3">
          <button
            type="submit"
            className="rounded-lg bg-green-700 px-6 py-3 text-white hover:bg-green-800"
          >
            Simpan Perubahan
          </button>

          <button
            type="button"
            className="rounded-lg bg-gray-300 px-6 py-3 text-gray-700 hover:bg-gray-400"
          >
            Batal
          </button>
        </div>
      </form>
    </div>
  );
}