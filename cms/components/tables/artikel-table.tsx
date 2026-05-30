export default function ArtikelTable() {
  return (
    <table className="w-full">
      <thead>
        <tr className="border-b">
          <th className="text-left py-3">
            Judul
          </th>

          <th className="text-left py-3">
            Kategori
          </th>

          <th className="text-left py-3">
            Status
          </th>
        </tr>
      </thead>

      <tbody>
        <tr className="border-b">
          <td className="py-3">
            Menikmati Keindahan Air Terjun
          </td>

          <td>Wisata Alam</td>

          <td>
            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">
              Published
            </span>
          </td>
        </tr>

        <tr>
          <td className="py-3">
            Sungai Way Besai
          </td>

          <td>Wisata Alam</td>

          <td>
            <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full">
              Draft
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  );
}