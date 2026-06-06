import Link from "next/link";
import { Plus } from "lucide-react";
import ArtikelTable from "@/components/tables/artikel-table";

export default function ArtikelPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">
            Artikel Wisata
          </h1>

          <p className="text-gray-500">
            Kelola artikel dan berita wisata
          </p>
        </div>

        <Link
          href="/dashboard/artikel/tambah"
          className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <Plus size={18} />
          Tambah Artikel
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-5">
        <ArtikelTable />
      </div>
    </div>
  );
}