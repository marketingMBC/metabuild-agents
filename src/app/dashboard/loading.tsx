export default function DashboardLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Header skeleton */}
      <div className="space-y-2">
        <div className="h-7 w-48 bg-white/10 rounded-lg" />
        <div className="h-4 w-72 bg-white/5 rounded" />
      </div>

      {/* KPI skeleton */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="rounded-xl border border-white/10 bg-surface p-4 space-y-3">
            <div className="h-3 w-20 bg-white/5 rounded" />
            <div className="h-6 w-16 bg-white/10 rounded" />
            <div className="h-2.5 w-24 bg-white/5 rounded" />
          </div>
        ))}
      </div>

      {/* Chart skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-xl border border-white/10 bg-surface p-5 h-64" />
        <div className="rounded-xl border border-white/10 bg-surface p-5 h-64" />
      </div>

      {/* Content skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-xl border border-white/10 bg-surface p-5 h-48" />
        <div className="rounded-xl border border-white/10 bg-surface p-5 h-48" />
      </div>
    </div>
  );
}
