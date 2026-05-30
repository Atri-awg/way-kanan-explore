export default function DestinasiForm() {
  return (
    <form className="space-y-4">

      <div>
        <label className="block mb-2">
          Nama Destinasi
        </label>

        <input
          type="text"
          className="w-full border rounded-lg p-3"
        />
      </div>

      <div>
        <label className="block mb-2">
          Kategori
        </label>

        <select className="w-full border rounded-lg p-3">
          <option>Wisata Alam</option>
          <option>Wisata Budaya</option>
          <option>Wisata Religi</option>
        </select>
      </div>

      <div>
        <label className="block mb-2">
          Lokasi
        </label>

        <input
          type="text"
          className="w-full border rounded-lg p-3"
        />
      </div>

      <div>
        <label className="block mb-2">
          Deskripsi
        </label>

        <textarea
          rows={6}
          className="w-full border rounded-lg p-3"
        />
      </div>

      <div>
        <label className="block mb-2">
          Gambar Utama
        </label>

        <input
          type="file"
          className="w-full border rounded-lg p-3"
        />
      </div>

      <button
        type="submit"
        className="bg-green-600 text-white px-5 py-3 rounded-lg"
      >
        Simpan Destinasi
      </button>

    </form>
  );
}