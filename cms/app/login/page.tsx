export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow">
        <h1 className="text-2xl font-bold text-center mb-6">
          Login CMS
        </h1>

        <form className="space-y-4">
          <div>
            <label className="block mb-1 text-sm">
              Email
            </label>

            <input
              type="email"
              placeholder="Masukkan email"
              className="w-full border rounded-lg px-4 py-2"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm">
              Password
            </label>

            <input
              type="password"
              placeholder="Masukkan password"
              className="w-full border rounded-lg px-4 py-2"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-lg"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}