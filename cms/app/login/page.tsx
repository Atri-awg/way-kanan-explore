export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-waykanan-bg relative overflow-hidden">
      {/* Ornamen Latar Belakang (Opsional untuk estetika) */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-waykanan-dark/5 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-waykanan-orange/10 rounded-full blur-3xl"></div>

      <div className="w-full max-w-md z-10 mx-4">
        {/* Logo Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold italic text-waykanan-dark tracking-tight">
            Waykanan <span className="text-waykanan-orange">EXPLORE</span>
          </h1>
          <p className="text-gray-500 mt-2 text-sm uppercase tracking-widest">
            Content Management System
          </p>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Selamat Datang</h2>
          <p className="text-gray-500 text-sm mb-8">Silakan masuk untuk mengelola konten Anda.</p>

          <form className="space-y-5">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                placeholder="admin@waykanan.com"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-waykanan-dark/20 focus:border-waykanan-dark transition-all"
              />
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-medium text-gray-700">
                  Password
                </label>
                <a href="#" className="text-xs text-waykanan-orange hover:underline font-semibold">
                  Lupa Password?
                </a>
              </div>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-waykanan-dark/20 focus:border-waykanan-dark transition-all"
              />
            </div>

            <div className="flex items-center space-x-2 pb-2">
              <input type="checkbox" id="remember" className="rounded border-gray-300 text-waykanan-dark focus:ring-waykanan-dark" />
              <label htmlFor="remember" className="text-xs text-gray-600 cursor-pointer">Ingat saya di perangkat ini</label>
            </div>

            <button
              type="submit"
              className="w-full bg-waykanan-dark hover:bg-waykanan-light text-black font-semibold py-3 rounded-xl shadow-lg shadow-waykanan-dark/20 transition-all active:scale-[0.98]"
            >
              Masuk ke Dashboard
            </button>
          </form>
        </div>

        {/* Footer Login */}
        <p className="text-center text-gray-400 text-xs mt-8">
          © 2026 Admin Waykanan. All rights reserved.
        </p>
      </div>
    </div>
  );
}