export default function Navbar() {
  return (
    <div className="bg-white h-16 rounded-2xl shadow px-6 flex items-center justify-between">
      <h1 className="text-xl font-semibold">
        Dashboard
      </h1>

      <div className="flex items-center gap-4">
        <input
          type="text"
          placeholder="Search..."
          className="border rounded-lg px-4 py-2"
        />

        <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center font-bold">
          A
        </div>
      </div>
    </div>
  );
}