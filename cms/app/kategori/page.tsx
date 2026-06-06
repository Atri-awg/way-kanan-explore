import Link from "next/link";
import { Plus } from "lucide-react";
import KategoriTable from "@/components/tables/kategori-table";

export default function KategoriPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Kategori Wisata
          </h1>

          <p className="text-gray-500">
            Kelola data kategori wisata
          </p>
        </div>

        <Link
          href="/kategori/tambah"
          className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700"
        >
          <Plus size={18} />
          Tambah Kategori
        </Link>
      </div>

      <div className="rounded-xl bg-white p-5 shadow-sm">
        <KategoriTable />
      </div>
    </div>
  );
}