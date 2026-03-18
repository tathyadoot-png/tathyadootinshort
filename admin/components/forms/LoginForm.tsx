// "use client";

// import { useState } from "react";
// import { Mail, Lock, ChevronRight } from "lucide-react";
// import { useAuth } from "@/hooks/useAuth";
// import Input from "@/components/ui/Input";
// import Button from "@/components/ui/Button";

// export default function LoginForm() {
//   const { login } = useAuth();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e: any) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       await login(email, password);
//       // Redirect login hook ke andar handle ho raha hoga
//     } catch (err: any) {
//       alert(err.message || "Invalid Credentials");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-5">
//       <div className="space-y-1">
//         <label className="text-[11px] font-bold text-[#475569] uppercase tracking-[0.15em] ml-1">
//           Admin Email
//         </label>
//         <Input
//           type="email"
//           required
//           placeholder="admin@company.com"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           // Agar aapka Input component 'icon' prop support karta hai:
//           icon={<Mail className="w-5 h-5 transition-colors group-focus-within:text-[#C41E3A]" />}
//           className="hover:border-[#C41E3A]/30 transition-all"
//         />
//       </div>

//       <div className="space-y-1">
//         <div className="flex justify-between items-center ml-1">
//           <label className="text-[11px] font-bold text-[#475569] uppercase tracking-[0.15em]">
//             Secure Password
//           </label>
//           <span className="text-[10px] font-bold text-[#C41E3A] cursor-pointer hover:underline">FORGOT?</span>
//         </div>
//         <Input
//           type="password"
//           required
//           placeholder="••••••••"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           icon={<Lock className="w-5 h-5 transition-colors group-focus-within:text-[#C41E3A]" />}
//           className="hover:border-[#C41E3A]/30 transition-all"
//         />
//       </div>

//       <div className="pt-2">
//         <Button 
//           loading={loading}
//           className="w-full h-12 bg-[#0A1128] hover:bg-[#C41E3A] text-white rounded-xl font-bold tracking-widest uppercase text-[12px] shadow-lg shadow-gray-200 transition-all duration-300 flex items-center justify-center gap-2 group"
//         >
//           {loading ? "Verifying..." : (
//             <>
//               Authorize Access
//               <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
//             </>
//           )}
//         </Button>
//       </div>
//     </form>
//   );
// }


