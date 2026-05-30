import Link from "next/link";
import { Plus } from "lucide-react";
import DestinasiTable from "@/components/tables/destinasi-table";

export default function DestinasiPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Kelola Destinasi</h1>
          <p className="text-gray-500">
            Tambah, edit, dan hapus data destinasi wisata
          </p>
        </div>

        <Link
          href="/destinasi/tambah"
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          <Plus size={18} />
          Tambah Destinasi
        </Link>
      </div>

      {/* Statistik */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-xl bg-white p-5 shadow">
          <h3 className="text-sm text-gray-500">Total Destinasi</h3>
          <p className="mt-2 text-3xl font-bold">15</p>
        </div>

        <div className="rounded-xl bg-white p-5 shadow">
          <h3 className="text-sm text-gray-500">Aktif</h3>
          <p className="mt-2 text-3xl font-bold text-green-600">12</p>
        </div>

        <div className="rounded-xl bg-white p-5 shadow">
          <h3 className="text-sm text-gray-500">Draft</h3>
          <p className="mt-2 text-3xl font-bold text-yellow-600">3</p>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-xl bg-white p-6 shadow">
        <DestinasiTable />
      </div>
    </div>
  );
}