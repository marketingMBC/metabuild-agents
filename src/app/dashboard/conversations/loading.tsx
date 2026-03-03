export default function ConversationsLoading() {
  return (
    <div className="h-[calc(100vh-7rem)]">
      <div className="flex h-full rounded-xl border border-white/10 overflow-hidden bg-surface animate-pulse">
        {/* List skeleton */}
        <div className="w-80 flex-shrink-0 border-r border-white/10 p-3 space-y-3">
          <div className="h-10 bg-white/5 rounded-lg" />
          <div className="h-8 bg-white/5 rounded-lg" />
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3 p-3 rounded-lg">
              <div className="w-10 h-10 rounded-full bg-white/5" />
              <div className="flex-1 space-y-2">
                <div className="h-3 w-24 bg-white/5 rounded" />
                <div className="h-2.5 w-40 bg-white/[0.03] rounded" />
              </div>
            </div>
          ))}
        </div>
        {/* Thread skeleton */}
        <div className="flex-1 p-6 flex items-center justify-center">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-full bg-white/5 mx-auto" />
            <div className="h-4 w-48 bg-white/5 rounded mx-auto" />
          </div>
        </div>
      </div>
    </div>
  );
}
