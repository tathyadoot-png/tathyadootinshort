import LoginForm from "@/components/forms/LoginForm";
import { ShieldAlert } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0A1128] relative overflow-hidden selection:bg-red-500/30">
      
      {/* --- BACKGROUND ANIMATIONS (Image jaisi depth ke liye) --- */}
      {/* Center Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#C41E3A]/10 rounded-full blur-[120px] pointer-events-none" />
      
      {/* Decorative Particles */}
      <div className="absolute top-20 left-20 w-1 h-1 bg-red-500 rounded-full animate-pulse shadow-[0_0_10px_#C41E3A]" />
      <div className="absolute bottom-20 right-20 w-1.5 h-1.5 bg-red-600 rounded-full animate-ping opacity-20" />
      
      {/* --- MAIN LOGIN CARD --- */}
      <div className="w-full max-w-[440px] z-10 px-6">
        <div className="bg-[#0f172a]/40 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-10 shadow-2xl relative overflow-visible group">
          
          {/* Top Shield Logo (Floating effect) */}
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-20 h-20 bg-gradient-to-br from-[#C41E3A] to-[#9B1B30] rounded-2xl flex items-center justify-center shadow-[0_0_40px_rgba(196,30,58,0.4)] border border-white/20 transform -rotate-6 transition-transform group-hover:rotate-0 duration-500">
             <ShieldAlert className="text-white w-10 h-10" />
          </div>

          {/* Header Section */}
          <div className="mt-8 text-center mb-10">
            <h1 className="text-3xl font-black text-white tracking-tighter uppercase">
              Admin <span className="text-[#C41E3A] animate-pulse">Portal</span>
            </h1>
            <div className="flex items-center justify-center gap-2 mt-2">
              <span className="h-[1px] w-4 bg-[#C41E3A]" />
              <p className="text-slate-400 text-[10px] font-bold tracking-[0.3em] uppercase opacity-70">
                Secure Access Terminal
              </p>
              <span className="h-[1px] w-4 bg-[#C41E3A]" />
            </div>
          </div>

          {/* Login Form Component */}
          <LoginForm />

          {/* Card Footer Decoration */}
          <div className="mt-10 flex items-center justify-center gap-4">
            <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-white/10" />
            <div className="w-2 h-2 rounded-full border border-white/20 bg-red-600/20" />
            <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-white/10" />
          </div>
        </div>

        {/* Outer Footer Text */}
        <div className="mt-8 text-center space-y-2">
          <p className="text-slate-500 text-[11px] font-bold tracking-widest uppercase opacity-50">
            Restricted System Access
          </p>
          <div className="flex justify-center gap-6">
             <span className="text-[#C41E3A]/60 text-[10px] font-mono">ID: 88-X21</span>
             <span className="text-[#C41E3A]/60 text-[10px] font-mono">SEC-LEVEL: 4</span>
          </div>
        </div>
      </div>
    </div>
  );
}