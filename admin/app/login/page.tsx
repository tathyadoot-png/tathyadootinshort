// import LoginForm from "@/components/forms/LoginForm";
// import { ShieldCheck } from "lucide-react";

// export default function LoginPage() {
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-[#0A1128] relative overflow-hidden">
      
//       {/* Glow Effects (Image ki tarah) */}
//       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#C41E3A]/10 rounded-full blur-[120px] pointer-events-none" />
//       <div className="absolute top-[20%] right-[10%] w-2 h-2 bg-red-500 rounded-full animate-ping opacity-20" />
//       <div className="absolute bottom-[30%] left-[15%] w-1.5 h-1.5 bg-red-400 rounded-full animate-pulse opacity-20" />

//       <div className="w-full max-w-[440px] z-10 px-6">
        
//         {/* Card Container with Neon Border */}
//         <div className="bg-[#0f172a]/80 backdrop-blur-2xl border border-white/10 p-10 rounded-[2.5rem] shadow-2xl relative">
          
//           {/* Top Shield Icon (Floating) */}
//           <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-20 h-20 bg-gradient-to-br from-[#C41E3A] to-[#9B1B30] rounded-2xl flex items-center justify-center shadow-[0_0_40px_rgba(196,30,58,0.4)] border border-white/20 transform -rotate-6">
//              <span className="text-white text-4xl font-black italic">A</span>
//           </div>

//           <div className="mt-8 text-center mb-10">
//             <h1 className="text-3xl font-black text-white tracking-tighter uppercase">
//               Admin <span className="text-[#C41E3A]">Portal</span>
//             </h1>
//             <p className="text-slate-400 text-[10px] font-bold tracking-[0.3em] uppercase mt-2 opacity-60">
//               Secure Access Terminal
//             </p>
//           </div>

//           <LoginForm />

//           <div className="mt-10 flex items-center justify-center gap-4">
//             <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-slate-700" />
//             <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">v2.0.4</span>
//             <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-slate-700" />
//           </div>
//         </div>

//         <p className="text-center mt-8 text-slate-500 text-[11px] font-medium tracking-wide">
//           SYSTEM UNDER <span className="text-red-900 font-bold">MILITARY-GRADE</span> ENCRYPTION
//         </p>
//       </div>
//     </div>
//   );
// }


import AuthLayout from "@/components/auth/AuthLayout";
import AuthCard from "@/components/auth/AuthCard";
import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <AuthLayout>
      <AuthCard>
        <LoginForm />
      </AuthCard>
    </AuthLayout>
  );
}