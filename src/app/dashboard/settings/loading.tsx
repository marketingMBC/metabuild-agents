export default function SettingsLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="space-y-2">
        <div className="h-7 w-40 bg-white/10 rounded-lg" />
        <div className="h-4 w-60 bg-white/5 rounded" />
      </div>
      <div className="flex gap-2 border-b border-white/10 pb-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-8 w-24 bg-white/5 rounded-lg" />
        ))}
      </div>
      <div className="rounded-xl border border-white/10 bg-surface p-6 space-y-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="space-y-2">
            <div className="h-3.5 w-24 bg-white/5 rounded" />
            <div className="h-10 bg-white/[0.03] rounded-lg border border-white/10" />
          </div>
        ))}
      </div>
    </div>
  );
}
