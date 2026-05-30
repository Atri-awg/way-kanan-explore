import Link from "next/link";
import { Plus } from "lucide-react";
import DestinasiTable from "@/components/tables/destinasi-table";

export default function DestinasiPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">
            Destinasi Wisata
          </h1>

          <p className="text-gray-500">
            Kelola data destinasi wisata
          </p>
        </div>

        <Link
          href="/destinasi/tambah"
          className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <Plus size={18} />
          Tambah Destinasi
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-5">
        <DestinasiTable />
      </div>
    </div>
  );
}