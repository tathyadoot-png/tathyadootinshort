export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0A1128] via-[#1a1f3c] to-[#0A1128] p-4">
      {children}
    </div>
  );
}