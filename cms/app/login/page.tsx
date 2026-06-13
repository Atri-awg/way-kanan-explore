"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_AUTH_API}/auth/cms/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "Login gagal"
        );
      }

      // Simpan token dan data user
      localStorage.setItem(
        "access_token",
        result.access_token
      );

      localStorage.setItem(
        "refresh_token",
        result.refresh_token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(result.user)
      );

      // Redirect ke dashboard CMS
      router.push("/dashboard");

    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-waykanan-bg relative overflow-hidden">

      {/* Background Ornament */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-waykanan-dark/5 rounded-full blur-3xl"></div>

      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-waykanan-orange/10 rounded-full blur-3xl"></div>


      <div className="w-full max-w-md z-10 mx-4">

        {/* Logo */}
        <div className="text-center mb-8">

          <h1 className="text-3xl font-bold italic text-waykanan-dark tracking-tight">
            Waykanan{" "}
            <span className="text-waykanan-orange">
              EXPLORE
            </span>
          </h1>

          <p className="text-gray-500 mt-2 text-sm uppercase tracking-widest">
            Content Management System
          </p>

        </div>


        {/* Card Login */}
        <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100">

          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Selamat Datang
          </h2>

          <p className="text-gray-500 text-sm mb-8">
            Silakan masuk untuk mengelola konten Anda.
          </p>


          {/* Error Message */}
          {
            error && (
              <div className="mb-5 p-3 rounded-xl bg-red-100 text-red-600 text-sm">
                {error}
              </div>
            )
          }


          {/* Form Login */}
          <form
            className="space-y-5"
            onSubmit={handleLogin}
          >

            {/* Email */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Email Address
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                placeholder="admin@waykanan.com"
                required
                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-waykanan-dark/20 focus:border-waykanan-dark transition-all"
              />
            </div>


            {/* Password */}
            <div>

              <label className="block mb-2 text-sm font-medium text-gray-700">
                Password
              </label>

              <input
                type="password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                placeholder="••••••••"
                required
                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-waykanan-dark/20 focus:border-waykanan-dark transition-all"
              />

            </div>


            {/* Remember Me */}
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="remember"
                className="rounded border-gray-300 text-waykanan-dark"
              />

              <label
                htmlFor="remember"
                className="text-xs text-gray-600 cursor-pointer"
              >
                Ingat saya di perangkat ini
              </label>
            </div>


            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="
                w-full 
                bg-waykanan-dark
                hover:bg-waykanan-light
                text-black
                font-semibold
                py-3
                rounded-xl
                shadow-lg
                shadow-waykanan-dark/20
                transition-all
                active:scale-[0.98]
                disabled:opacity-50
                disabled:cursor-not-allowed
              "
            >

              {
                loading
                  ? "Sedang masuk..."
                  : "Masuk ke Dashboard"
              }

            </button>

          </form>

        </div>


        {/* Footer */}
        <p className="text-center text-gray-400 text-xs mt-8">
          © 2026 Admin Waykanan. All rights reserved.
        </p>

      </div>

    </div>
  );
}