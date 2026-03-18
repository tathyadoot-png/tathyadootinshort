"use client";

import { useState } from "react";
import { Mail, Lock, ChevronRight } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";


export default function LoginForm() {
  const { login } = useAuth();
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

 const handleSubmit = async (e: any) => {
  e.preventDefault();
  setLoading(true);
  try {
    await login(form.email, form.password);

    // console.log("Login Success");
    router.push("/dashboard");


  } catch (err: any) {
    alert(err.message || "Invalid Credentials");
  } finally {
    setLoading(false);
  }
};

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      
      <h2 className="text-2xl font-bold text-white text-center">
        Admin Login
      </h2>

      {/* Email */}
      <div className="relative">
        <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
        <input
          type="email"
          name="email"
          placeholder="admin@site.com"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full pl-10 pr-3 py-3 rounded-xl bg-white/20 text-white placeholder-gray-300 border border-white/20 focus:ring-2 focus:ring-[#C41E3A] outline-none"
        />
      </div>

      {/* Password */}
      <div className="relative">
        <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
        <input
          type="password"
          name="password"
          placeholder="••••••••"
          value={form.password}
          onChange={handleChange}
          required
          className="w-full pl-10 pr-3 py-3 rounded-xl bg-white/20 text-white placeholder-gray-300 border border-white/20 focus:ring-2 focus:ring-[#C41E3A] outline-none"
        />
      </div>

      {/* Button */}
      <button
        disabled={loading}
        className="w-full py-3 rounded-xl bg-[#C41E3A] hover:bg-[#a81830] text-white font-bold flex items-center justify-center gap-2 transition"
      >
        {loading ? "Logging in..." : (
          <>
            Login
            <ChevronRight className="w-4 h-4" />
          </>
        )}
      </button>
    </form>
  );
}