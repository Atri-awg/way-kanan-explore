export default function TambahDestinasiPage() {
  return (
    <div className="rounded-xl bg-white p-6 shadow">
      <h1 className="mb-6 text-2xl font-bold">
        Tambah Destinasi Wisata
      </h1>

      <form className="space-y-4">
        <input
          type="text"
          placeholder="Nama Destinasi"
          className="w-full rounded-lg border p-3"
        />

        <input
          type="text"
          placeholder="Lokasi"
          className="w-full rounded-lg border p-3"
        />

        <textarea
          placeholder="Deskripsi"
          className="w-full rounded-lg border p-3"
          rows={5}
        />

        <button
          type="submit"
          className="rounded-lg bg-blue-600 px-5 py-2 text-white"
        >
          Simpan
        </button>
      </form>
    </div>
  );
}