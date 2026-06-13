import {
  FileText,
  MapPin,
  ImageIcon,
  Video,
  Users,
} from "lucide-react";

import DashboardChart from "@/components/dashboard/dasshboard-chart";
import ArtikelTable from "@/components/dashboard/device-chart";
import DeviceChart from "@/components/tables/artikel-table";

const cards = [
  {
    title: "Total Artikel",
    value: 48,
    icon: FileText,
  },
  {
    title: "Total Destinasi",
    value: 26,
    icon: MapPin,
  },
  {
    title: "Total Galeri",
    value: 132,
    icon: ImageIcon,
  },
  {
    title: "Total Video",
    value: 19,
    icon: Video,
  },
  {
    title: "Total Pengguna",
    value: 14,
    icon: Users,
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          Dashboard
        </h1>

        <p className="text-gray-500">
          Selamat datang di CMS Waykanan Explore
        </p>
      </div>

      {/* Cards */}

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.title}
              className="bg-white rounded-xl p-5 shadow"
            >
              <div className="flex items-center gap-3">
                <Icon size={30} />
                <div>
                  <p className="text-sm text-gray-500">
                    {card.title}
                  </p>

                  <h2 className="text-2xl font-bold">
                    {card.value}
                  </h2>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Chart */}

      <div className="grid lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 bg-white p-5 rounded-xl shadow">
          <h2 className="font-semibold mb-4">
            Statistik Pengunjung
          </h2>

          <DashboardChart />
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <h2 className="font-semibold mb-4">
            Baru Saja DiTambahkan
          </h2>

          <DeviceChart />
        </div>
      </div>

      {/* Artikel */}

      <div className="bg-white p-5 rounded-xl shadow">
        <h2 className="font-semibold mb-4">
          Artikel Terbaru
        </h2>

        <ArtikelTable />
      </div>
    </div>
  );
}