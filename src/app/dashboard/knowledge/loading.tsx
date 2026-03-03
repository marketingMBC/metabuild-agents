export default function KnowledgeLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="space-y-2">
        <div className="h-7 w-48 bg-white/10 rounded-lg" />
        <div className="h-4 w-72 bg-white/5 rounded" />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="rounded-xl border border-white/10 bg-surface p-4 space-y-2">
            <div className="h-3 w-20 bg-white/5 rounded" />
            <div className="h-7 w-12 bg-white/10 rounded" />
          </div>
        ))}
      </div>
      <div className="h-8 bg-white/5 rounded-lg w-64" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="rounded-xl border border-white/10 bg-surface p-5 space-y-3">
            <div className="h-4 w-40 bg-white/5 rounded" />
            <div className="h-3 w-24 bg-white/[0.03] rounded" />
            <div className="h-6 w-16 bg-white/5 rounded-full" />
          </div>
        ))}
      </div>
    </div>
  );
}
