export default function ReportsLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="h-7 w-32 bg-white/10 rounded-lg" />
          <div className="h-4 w-52 bg-white/5 rounded" />
        </div>
        <div className="h-9 w-28 bg-white/10 rounded-lg" />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="rounded-xl border border-white/10 bg-surface p-4 space-y-2">
            <div className="h-3 w-24 bg-white/5 rounded" />
            <div className="h-7 w-16 bg-white/10 rounded" />
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-xl border border-white/10 bg-surface p-5 h-56" />
        <div className="rounded-xl border border-white/10 bg-surface p-5 h-56" />
      </div>
      <div className="rounded-xl border border-white/10 bg-surface p-5 h-48" />
    </div>
  );
}
