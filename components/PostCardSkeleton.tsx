export default function PostCardSkeleton() {
  return (
    <div className="bg-white dark:bg-stone-900 rounded-2xl overflow-hidden border border-stone-200 dark:border-stone-800">
      {/* Image placeholder */}
      <div className="h-48 bg-stone-200 dark:bg-stone-800 animate-pulse" />
      {/* Content */}
      <div className="p-5 space-y-3">
        <div className="h-3 bg-stone-200 dark:bg-stone-800 rounded-full animate-pulse w-1/4" />
        <div className="h-5 bg-stone-200 dark:bg-stone-800 rounded-full animate-pulse w-4/5" />
        <div className="h-4 bg-stone-200 dark:bg-stone-800 rounded-full animate-pulse" />
        <div className="h-4 bg-stone-200 dark:bg-stone-800 rounded-full animate-pulse w-5/6" />
        <div className="pt-2 flex items-center gap-3">
          <div className="h-3 bg-stone-200 dark:bg-stone-800 rounded-full animate-pulse w-20" />
          <div className="h-3 bg-stone-200 dark:bg-stone-800 rounded-full animate-pulse w-14" />
        </div>
      </div>
    </div>
  )
}

export function PostGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <PostCardSkeleton key={i} />
      ))}
    </div>
  )
}
