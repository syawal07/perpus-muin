export default function Loading() {
  return (
    <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-100 flex flex-col items-center justify-center min-h-screen">
      <div className="relative w-20 h-20">
        <div className="absolute inset-0 border-4 border-brand-yellow/20 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-brand-green rounded-full border-t-transparent animate-spin"></div>
      </div>
      <p className="mt-6 text-brand-green font-bold tracking-widest uppercase text-sm animate-pulse">
        Memuat Data...
      </p>
    </div>
  );
}