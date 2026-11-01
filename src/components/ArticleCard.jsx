import React from 'react'
import { Calendar, Clock, Bookmark, Heart, Share2, ChevronRight } from 'lucide-react'

export default function ArticleCard({ article, isBookmarked, onToggleBookmark, isLiked, onToggleLike, onOpenDetails, addToast }) {
  const { title, description, urlToImage, source, publishedAt, content, url } = article

  // Format date nicely
  const formatDate = (dateStr) => {
    try {
      const date = new Date(dateStr)
      return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })
    } catch {
      return 'Unknown Date'
    }
  }

  // Estimate read time based on words count
  const wordCount = (description?.split(/\s+/)?.length || 0) + (content?.split(/\s+/)?.length || 0)
  const readTime = Math.max(1, Math.round(wordCount / 200) + 1)

  return (
    <article 
      onClick={onOpenDetails}
      className="group flex flex-col h-full rounded-2xl overflow-hidden glass-card hover:bg-white/80 dark:hover:bg-slate-900/80 hover:shadow-xl hover:-translate-y-1 border border-slate-200/50 dark:border-slate-800/50 transition-all duration-300 cursor-pointer"
    >
      {/* Image Block */}
      <div className="h-52 w-full bg-slate-100 dark:bg-slate-800 relative overflow-hidden shrink-0">
        {urlToImage ? (
          <img 
            src={urlToImage} 
            alt={title} 
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500 ease-out" 
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-400 dark:text-slate-600 text-sm bg-slate-100 dark:bg-slate-800">
            No Preview Image
          </div>
        )}
        
        {/* Overlays Action Row */}
        <div className="absolute top-4 right-4 z-10 flex items-center gap-1.5">
          {/* Share Button */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              if (navigator.share) {
                navigator.share({
                  title: title,
                  text: description,
                  url: url
                }).catch(() => {})
              } else {
                navigator.clipboard.writeText(url)
                addToast('Article link copied to clipboard!', 'success')
              }
            }}
            className="p-2 rounded-xl bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border border-slate-200/50 dark:border-slate-800/50 text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:scale-110 active:scale-95 transition-all duration-200 shadow-sm"
            title="Share Article"
          >
            <Share2 className="w-4 h-4" />
          </button>

          {/* Like Button */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              onToggleLike(article)
            }}
            className="p-2 rounded-xl bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border border-slate-200/50 dark:border-slate-800/50 text-slate-600 dark:text-slate-300 hover:text-rose-600 dark:hover:text-rose-400 hover:scale-110 active:scale-95 transition-all duration-200 shadow-sm"
            title={isLiked ? "Unlike Article" : "Like Article"}
          >
            <Heart className={`w-4 h-4 ${isLiked ? 'text-rose-600 dark:text-rose-400 fill-current' : ''}`} />
          </button>

        </div>

        {/* Source Badge overlay */}
        {source?.name && (
          <div className="absolute bottom-4 left-4 px-2.5 py-1 rounded-lg bg-slate-950/75 backdrop-blur-sm text-xs font-semibold text-white border border-white/10 uppercase tracking-wide">
            {source.name}
          </div>
        )}

        {/* Video available indicator */}
        <div className="absolute bottom-4 right-4 px-2 py-1 rounded-lg bg-rose-600/90 backdrop-blur-sm text-[9px] font-black text-white flex items-center gap-1 shadow-sm uppercase tracking-widest border border-rose-500/30">
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
          <span>Video</span>
        </div>
      </div>

      {/* Content Block */}
      <div className="p-5 flex flex-col justify-between flex-1 gap-3">
        <div className="flex flex-col gap-2">
          {/* Date and Time badge */}
          <div className="flex items-center gap-3 text-xs text-slate-400 dark:text-slate-500">
            <div className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              <span>{formatDate(publishedAt)}</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              <span>{readTime} min read</span>
            </div>
          </div>

          <h3 className="font-bold text-lg text-slate-800 dark:text-white leading-snug group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2">
            {title}
          </h3>
          
          <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-3 leading-relaxed">
            {description}
          </p>
        </div>

        {/* Card Footer */}
        <div className="flex items-center justify-between pt-3 mt-1 border-t border-slate-100 dark:border-slate-800/40 text-xs font-semibold text-indigo-600 dark:text-indigo-400">
          <span>Read Article</span>
          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </article>
  )
}