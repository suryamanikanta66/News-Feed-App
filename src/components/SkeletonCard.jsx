import React from 'react'

export default function SkeletonCard() {
  return (
    <div className="w-full rounded-2xl overflow-hidden glass-card shadow-sm border border-slate-200/50 dark:border-slate-800/50 animate-pulse">
      {/* Image Block */}
      <div className="h-52 bg-slate-200 dark:bg-slate-800 w-full" />
      
      <div className="p-5 flex flex-col gap-4">
        {/* Source & Date Metadata */}
        <div className="flex justify-between items-center">
          <div className="h-4 w-20 bg-slate-200 dark:bg-slate-800 rounded-md" />
          <div className="h-4 w-24 bg-slate-200 dark:bg-slate-800 rounded-md" />
        </div>
        
        {/* Title */}
        <div className="flex flex-col gap-2">
          <div className="h-6 w-full bg-slate-200 dark:bg-slate-800 rounded-md" />
          <div className="h-6 w-3/4 bg-slate-200 dark:bg-slate-800 rounded-md" />
        </div>
        
        {/* Description */}
        <div className="flex flex-col gap-2">
          <div className="h-4 w-full bg-slate-200 dark:bg-slate-800 rounded-md" />
          <div className="h-4 w-5/6 bg-slate-200 dark:bg-slate-800 rounded-md" />
        </div>
        
        {/* Footer info / Read time */}
        <div className="flex justify-between items-center pt-2 mt-2 border-t border-slate-100 dark:border-slate-800/50">
          <div className="h-5 w-16 bg-slate-200 dark:bg-slate-800 rounded-full" />
          <div className="h-4 w-12 bg-slate-200 dark:bg-slate-800 rounded-md" />
        </div>
      </div>
    </div>
  )
}
