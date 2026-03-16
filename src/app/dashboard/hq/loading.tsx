export default function HQLoading() {
  return (
    <div className="flex flex-col gap-4 h-full animate-pulse">
      {/* Header skeleton */}
      <div className="flex items-center justify-between">
        <div>
          <div className="h-6 w-32 rounded bg-white/10" />
          <div className="h-3 w-48 rounded bg-white/5 mt-2" />
        </div>
        <div className="h-4 w-28 rounded bg-white/5" />
      </div>

      {/* KPI skeleton */}
      <div className="grid grid-cols-4 gap-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-16 rounded-xl bg-white/5" />
        ))}
      </div>

      {/* Canvas skeleton */}
      <div className="flex gap-4 flex-1">
        <div className="flex flex-col flex-1 gap-4">
          <div className="rounded-xl bg-white/5 flex-1" style={{ aspectRatio: '960 / 640' }} />
          <div className="h-48 rounded-xl bg-white/5" />
        </div>
        <div className="w-72 rounded-xl bg-white/5" />
      </div>
    </div>
  );
}
