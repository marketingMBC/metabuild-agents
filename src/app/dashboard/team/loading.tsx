export default function TeamLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="h-7 w-24 bg-white/10 rounded-lg" />
          <div className="h-4 w-56 bg-white/5 rounded" />
        </div>
        <div className="h-9 w-36 bg-white/10 rounded-lg" />
      </div>
      <div className="rounded-xl border border-white/10 bg-surface overflow-hidden">
        <div className="px-5 py-3 border-b border-white/10 flex gap-20">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-3 w-20 bg-white/5 rounded" />
          ))}
        </div>
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="px-5 py-4 border-b border-white/5 flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-white/5" />
            <div className="space-y-2 flex-1">
              <div className="h-3.5 w-32 bg-white/5 rounded" />
              <div className="h-3 w-44 bg-white/[0.03] rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
