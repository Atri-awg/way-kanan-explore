"use client";

import { useState } from "react";

export default function TambahDestinasiPage() {
  const [formData, setFormData] = useState({
    nama: "",
    lokasi: "",
    kategori: "",
    deskripsi: "",
    jamOperasional: "",
    hargaTiket: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Data destinasi:", formData);

    alert("Destinasi berhasil ditambahkan!");
  };

  return (
    <div className="rounded-xl bg-white p-6 shadow">
      <h1 className="mb-2 text-3xl font-bold">
        Tambah Destinasi Wisata
      </h1>

      <p className="mb-6 text-gray-500">
        Tambahkan destinasi wisata baru ke dalam sistem
      </p>

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
            placeholder="Masukkan nama destinasi"
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
            placeholder="Contoh: Lampung Timur"
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
            <option value="">Pilih Kategori</option>
            <option value="Wisata Alam">Wisata Alam</option>
            <option value="Pantai">Pantai</option>
            <option value="Budaya">Budaya</option>
            <option value="Sejarah">Sejarah</option>
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
            placeholder="Masukkan deskripsi destinasi"
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
            placeholder="08:00 - 17:00"
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
            placeholder="50000"
            className="w-full rounded-lg border p-3"
          />
        </div>

        {/* Upload Gambar */}
        <div>
          <label className="mb-2 block font-medium">
            Upload Gambar
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
            className="rounded-lg bg-green-600 px-5 py-3 text-white hover:bg-green-700"
          >
            Simpan Destinasi
          </button>

          <button
            type="reset"
            className="rounded-lg bg-gray-200 px-5 py-3 text-gray-700 hover:bg-gray-300"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}