export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">
        Dashboard CMS
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-gray-500">Total Artikel</h2>
          <p className="text-3xl font-bold mt-2">120</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-gray-500">Total Destinasi</h2>
          <p className="text-3xl font-bold mt-2">45</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-gray-500">Pengunjung</h2>
          <p className="text-3xl font-bold mt-2">10K</p>
        </div>
      </div>
    </div>
  );
}