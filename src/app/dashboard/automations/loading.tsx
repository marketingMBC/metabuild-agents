export default function AutomationsLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="h-7 w-44 bg-white/10 rounded-lg" />
          <div className="h-4 w-60 bg-white/5 rounded" />
        </div>
      </div>
      <div className="flex gap-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-8 w-24 bg-white/5 rounded-full" />
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="rounded-xl border border-white/10 bg-surface p-5 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-white/5" />
              <div className="space-y-2 flex-1">
                <div className="h-4 w-32 bg-white/5 rounded" />
                <div className="h-3 w-20 bg-white/[0.03] rounded" />
              </div>
            </div>
            <div className="h-8 bg-white/[0.03] rounded" />
            <div className="h-3 w-40 bg-white/5 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}
