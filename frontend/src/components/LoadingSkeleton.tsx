interface LoadingSkeletonProps {
  count?: number;
  type?: 'card' | 'job' | 'list';
}

const LoadingSkeleton = ({ count = 6, type = 'card' }: LoadingSkeletonProps) => {
  if (type === 'job') {
    return (
      <div className="space-y-4">
        {[...Array(count)].map((_, i) => (
          <div key={i} className="bg-white dark:bg-slate-800 rounded-2xl p-7 border border-slate-100 dark:border-slate-700 animate-pulse">
            <div className="flex gap-3 mb-4">
              <div className="h-6 w-24 bg-slate-200 dark:bg-slate-700 rounded-full" />
              <div className="h-6 w-28 bg-slate-200 dark:bg-slate-700 rounded-full" />
            </div>
            <div className="h-6 w-2/3 bg-slate-200 dark:bg-slate-700 rounded-lg mb-3" />
            <div className="h-4 w-full bg-slate-100 dark:bg-slate-700/50 rounded mb-2" />
            <div className="h-4 w-3/4 bg-slate-100 dark:bg-slate-700/50 rounded" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(count)].map((_, i) => (
        <div key={i} className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-700 animate-pulse">
          <div className="h-48 bg-slate-200 dark:bg-slate-700" />
          <div className="p-6">
            <div className="h-5 bg-slate-200 dark:bg-slate-700 rounded mb-3 w-3/4" />
            <div className="h-4 bg-slate-100 dark:bg-slate-700/50 rounded mb-2" />
            <div className="h-4 bg-slate-100 dark:bg-slate-700/50 rounded mb-4 w-2/3" />
            <div className="flex gap-2">
              <div className="h-6 w-16 bg-blue-100 dark:bg-blue-900/30 rounded-lg" />
              <div className="h-6 w-16 bg-blue-100 dark:bg-blue-900/30 rounded-lg" />
              <div className="h-6 w-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LoadingSkeleton;
