export default function LeadsLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="space-y-2">
        <div className="h-7 w-24 bg-white/10 rounded-lg" />
        <div className="h-4 w-48 bg-white/5 rounded" />
      </div>
      <div className="flex gap-4 overflow-hidden h-[calc(100vh-14rem)]">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="w-64 flex-shrink-0 rounded-xl border border-white/10 bg-surface p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="h-4 w-24 bg-white/5 rounded" />
              <div className="h-5 w-8 bg-white/5 rounded-full" />
            </div>
            {Array.from({ length: 3 }).map((_, j) => (
              <div key={j} className="rounded-lg border border-white/5 p-3 space-y-2">
                <div className="h-3.5 w-28 bg-white/5 rounded" />
                <div className="h-3 w-20 bg-white/[0.03] rounded" />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
