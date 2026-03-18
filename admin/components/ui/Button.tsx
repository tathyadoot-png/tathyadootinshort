import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  loading?: boolean;
  className?: string;
}

export default function Button({ children, loading, className }: Props) {
  return (
    <button
      type="submit"
      disabled={loading}
      className={`w-full py-4 rounded-xl font-bold uppercase tracking-[0.2em] text-[13px] text-white 
      bg-gradient-to-r from-[#C41E3A] to-[#9B1B30] shadow-[0_0_20px_rgba(196,30,58,0.3)] 
      hover:shadow-[0_0_30px_rgba(196,30,58,0.5)] hover:scale-[1.01] active:scale-[0.98] 
      transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2 ${className}`}
    >
      {children}
    </button>
  );
}