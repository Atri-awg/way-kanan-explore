import Sidebar from "@/components/layout/sidebar";
import Navbar from "@/components/layout/navbar";

export default function DashboardPage() {
  return (
    <div className="bg-gray-100 min-h-screen flex">
      <Sidebar />

      <div className="flex-1 ml-64 p-6">
        <Navbar />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-6">
          <div className="bg-white rounded-2xl shadow p-6">
            <p className="text-gray-500">Total Artikel</p>
            <h1 className="text-4xl font-bold mt-2">120</h1>
          </div>

          <div className="bg-white rounded-2xl shadow p-6">
            <p className="text-gray-500">Total Destinasi</p>
            <h1 className="text-4xl font-bold mt-2">45</h1>
          </div>

           <div className="bg-white rounded-2xl shadow p-6">
            <p className="text-gray-500">Pengunjung</p>
            <h1 className="text-4xl font-bold mt-2">10K</h1>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-6">
          <div className="bg-white rounded-2xl shadow p-6 lg:col-span-2 h-96">
            <h2 className="text-xl font-semibold mb-4">
              Statistik Pengunjung
            </h2>

            <div className="w-full h-full flex items-center justify-center text-gray-400">
              Grafik Pengunjung
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow p-6 h-96">
            <h2 className="text-xl font-semibold mb-4">
              Aktivitas
            </h2>

             <ul className="space-y-4 text-sm">
              <li>Admin menambahkan artikel baru</li>
              <li>Destinasi wisata diperbarui</li>
              <li>Galeri berhasil diupload</li>
              <li>User baru ditambahkan</li>
            </ul>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow p-6 mt-6">
          <h2 className="text-xl font-semibold mb-4">
            Artikel Terbaru
          </h2>

          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3">Judul</th>
                <th className="text-left py-3">Kategori</th>
                <th className="text-left py-3">Tanggal</th>
                <th className="text-left py-3">Status</th>
              </tr>
            </thead>

            <tbody>
              <tr className="border-b">
                <td className="py-3">Wisata Way Kambas</td>
                <td>Wisata Alam</td>
                <td>07 Mei 2026</td>
                <td>
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                    Published
                  </span>
                </td>
              </tr>

              <tr className="border-b">
                <td className="py-3">Pantai Labuhan Jukung</td>
                <td>Pantai</td>
                <td>07 Mei 2026</td>
                <td>
                  <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm">
                    Draft
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}