export default function AnalysisSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      {/* Header skeleton */}
      <div className="space-y-2">
        <div className="h-4 bg-white/10 rounded w-3/4" />
        <div className="h-3 bg-white/5 rounded w-1/2" />
      </div>

      {/* Original languages skeleton */}
      <div className="rounded-lg border border-white/10 p-4 space-y-3">
        <div className="h-3 bg-amber-400/20 rounded w-1/3" />
        <div className="flex gap-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex-1 rounded-md border border-white/5 p-3 space-y-2">
              <div className="h-6 bg-white/10 rounded w-2/3" />
              <div className="h-2 bg-white/5 rounded w-1/2" />
              <div className="h-4 bg-amber-400/10 rounded w-1/3" />
              <div className="h-2 bg-white/5 rounded" />
              <div className="h-2 bg-white/5 rounded w-4/5" />
            </div>
          ))}
        </div>
      </div>

      {/* PaRDeS skeleton */}
      <div className="rounded-lg border border-white/10 p-4 space-y-3">
        <div className="h-3 bg-amber-400/20 rounded w-1/4" />
        {["P", "R", "D", "S"].map((l) => (
          <div key={l} className="flex gap-3 items-start">
            <div className="w-8 h-8 bg-white/10 rounded" />
            <div className="flex-1 space-y-1">
              <div className="h-2 bg-white/5 rounded" />
              <div className="h-2 bg-white/5 rounded w-5/6" />
            </div>
          </div>
        ))}
      </div>

      {/* Four levels skeleton */}
      <div className="rounded-lg border border-white/10 p-4 space-y-3">
        <div className="h-3 bg-amber-400/20 rounded w-1/3" />
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="space-y-1">
            <div className="h-2 bg-white/10 rounded w-1/4" />
            <div className="h-2 bg-white/5 rounded" />
            <div className="h-2 bg-white/5 rounded w-4/5" />
          </div>
        ))}
      </div>

      {/* Deep reading skeleton */}
      <div className="rounded-lg border border-white/10 p-4 space-y-2">
        <div className="h-3 bg-amber-400/20 rounded w-1/3" />
        <div className="h-2 bg-white/5 rounded" />
        <div className="h-2 bg-white/5 rounded w-11/12" />
        <div className="h-2 bg-white/5 rounded w-4/5" />
        <div className="h-2 bg-white/5 rounded" />
        <div className="h-2 bg-white/5 rounded w-3/4" />
      </div>
    </div>
  );
}
