import React, { useEffect, useState } from 'react'
import { X, ExternalLink, Calendar, BookOpen, Clock, Sparkles, Bookmark, Heart, Share2, MessageSquare, Send, User } from 'lucide-react'

export default function ArticleModal({ article, onClose, isBookmarked, onToggleBookmark, isLiked, onToggleLike, language = 'en', addToast }) {
  const [comments, setComments] = useState([])
  const [authorName, setAuthorName] = useState('')
  const [commentText, setCommentText] = useState('')
  const [mediaType, setMediaType] = useState('image')

  const formatModalDate = (dateStr) => {
    try {
      const date = new Date(dateStr)
      if (isNaN(date.getTime())) return 'Recently published'
      return date.toLocaleDateString(undefined, { dateStyle: 'medium' })
    } catch {
      return 'Recently published'
    }
  }

  useEffect(() => {
    // Disable body scroll when modal is open
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [])

  // Load comments from localStorage when article changes
  useEffect(() => {
    if (!article) return
    try {
      const urlKey = article.url ? encodeURIComponent(article.url) : 'fallback'
      const saved = localStorage.getItem(`news_comments_${urlKey}`)
      setComments(saved ? JSON.parse(saved) : [])
    } catch {
      setComments([])
    }
  }, [article])

  const handlePostComment = (e) => {
    e.preventDefault()
    if (!commentText.trim()) return
    
    const newComment = {
      id: Date.now().toString(),
      author: authorName.trim() || 'Anonymous Reader',
      text: commentText.trim(),
      timestamp: new Date().toISOString()
    }

    const updated = [newComment, ...comments]
    setComments(updated)
    try {
      const urlKey = article.url ? encodeURIComponent(article.url) : 'fallback'
      localStorage.setItem(`news_comments_${urlKey}`, JSON.stringify(updated))
    } catch (err) {
      console.error("Failed to save comment:", err)
    }
    setCommentText('')
    addToast('Comment posted successfully!', 'success')
  }

  if (!article) return null
  const { title, description, content, urlToImage, url, source, publishedAt, author } = article

  // Estimate read time or set default
  const wordCount = (description?.split(/\s+/)?.length || 0) + (content?.split(/\s+/)?.length || 0)
  const readTime = Math.max(1, Math.round(wordCount / 200) + 1)

  // Get corresponding YouTube Live TV Broadcast URL based on category or language
  const getLiveYoutubeEmbedUrl = () => {
    if (article.videoUrl) return article.videoUrl;
    
    const text = ((title || '') + ' ' + (description || '') + ' ' + (content || '')).toLowerCase();
    
    // Check language for local/regional live broadcasts
    if (language === 'te' || text.includes('తెలుగు') || text.includes('ఆంధ్ర') || text.includes('తెలంగాణ')) {
      // TV9 Telugu Live Channel
      return 'https://www.youtube.com/embed/live_stream?channel=UCV5P4F64Jg9642Wns45n8xQ&autoplay=1&mute=1&controls=1';
    }
    if (language === 'hi' || text.includes('समाचार') || text.includes('हिंदी') || text.includes('भारत')) {
      // Aaj Tak Live (Hindi)
      return 'https://www.youtube.com/embed/live_stream?channel=UCQ38nv4P18zE37o4NfQJb-g&autoplay=1&mute=1&controls=1';
    }
    if (language === 'ta' || text.includes('தமிழ்') || text.includes('செய்தி') || text.includes('சென்னை')) {
      // Polimer News Live (Tamil)
      return 'https://www.youtube.com/embed/live_stream?channel=UCi3sJ5W326b-u6PZmsaHkIQ&autoplay=1&mute=1&controls=1';
    }
    if (language === 'kn' || text.includes('ಕನ್ನಡ') || text.includes('ಸುದ್ದಿ') || text.includes('ಬೆಂಗಳೂರು')) {
      // TV9 Kannada Live (Kannada)
      return 'https://www.youtube.com/embed/live_stream?channel=UCcvbAL5b_D2s5mK0U_m2e0A&autoplay=1&mute=1&controls=1';
    }
    if (language === 'ml' || text.includes('കേരളം') || text.includes('വാർത്ത') || text.includes('മലയാളം')) {
      // Asianet News Live (Malayalam)
      return 'https://www.youtube.com/embed/live_stream?channel=UC52WqU98W8X-eT281vhyLlg&autoplay=1&mute=1&controls=1';
    }
    if (language === 'es' || text.includes('español') || text.includes('madrid') || text.includes('mexico')) {
      // RTVE Noticias Directo (Spanish)
      return 'https://www.youtube.com/embed/live_stream?channel=UCV0c4rJb7_R_t12pnh5fRng&autoplay=1&mute=1&controls=1';
    }
    if (language === 'fr' || text.includes('france') || text.includes('paris') || text.includes('français')) {
      // France 24 Live (French)
      return 'https://www.youtube.com/embed/live_stream?channel=UCdTwOh1k5UNQCgZghF-S15Q&autoplay=1&mute=1&controls=1';
    }
    if (language === 'de' || text.includes('deutsch') || text.includes('berlin') || text.includes('germany')) {
      // Tagesschau Live (German)
      return 'https://www.youtube.com/embed/live_stream?channel=UC5NOEU76X_X5t2Z1yE9u0Eg&autoplay=1&mute=1&controls=1';
    }
    if (language === 'zh' || text.includes('中文') || text.includes('中国') || text.includes('北京')) {
      // CNA Live (Chinese)
      return 'https://www.youtube.com/embed/live_stream?channel=UC83W1fA54359P4N8NqL8Bcg&autoplay=1&mute=1&controls=1';
    }

    // Default category streams (Bloomberg / Sky News / DW)
    if (text.includes('market') || text.includes('stock') || text.includes('finance') || text.includes('business') || text.includes('gold')) {
      // Bloomberg Global Financial News Live
      return 'https://www.youtube.com/embed/live_stream?channel=UCNye-wNBqNL5ZzHSJjfcUXA&autoplay=1&mute=1&controls=1';
    }
    if (text.includes('tech') || text.includes('science') || text.includes('space') || text.includes('quantum') || text.includes('computer')) {
      // NASA Live
      return 'https://www.youtube.com/embed/live_stream?channel=UCLA_DiR1FfKNvjuUpBHmylQ&autoplay=1&mute=1&controls=1';
    }
    
    // Default general: Sky News Live
    return 'https://www.youtube.com/embed/live_stream?channel=UChQrYy4yNq1pVCqyodZfykA&autoplay=1&mute=1&controls=1';
  }

  // Generate mockup AI takeaways
  const getMockTakeaways = (title, desc) => {
    const defaultTakeaways = [
      "Key development affecting current industry standards and future expectations.",
      "Analysts emphasize the need for adaptation and closer monitoring of this trend.",
      "Broader implications are expected to ripple across adjacent sectors in the coming weeks."
    ]
    if (!desc) return defaultTakeaways
    const words = desc.split(' ')
    if (words.length < 10) return defaultTakeaways

    const safeTitle = title ? title.slice(0, 50) : 'this story'
    const safeDesc = desc ? desc.slice(0, 80) : ''

    return [
      `Significant updates surrounding "${safeTitle}..." indicate major shifts.`,
      `Context details suggest: "${safeDesc}..."`,
      "Observers advise stakeholder vigilance as operational implications begin to manifest."
    ]
  }

  const takeaways = getMockTakeaways(title, description)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal Content Card */}
      <div className="relative w-full max-w-3xl max-h-[85vh] overflow-y-auto rounded-2xl glass-panel shadow-2xl border border-slate-200/50 dark:border-slate-800/50 flex flex-col transform transition-all duration-300 scale-100 animate-in fade-in zoom-in-95">
        
        {/* Top Control Bar */}
        <div className="sticky top-0 z-10 flex justify-between items-center px-6 py-4 glass-panel border-b border-slate-100 dark:border-slate-800/50">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            <BookOpen className="w-4 h-4" />
            <span>{source?.name || 'Publisher'}</span>
          </div>
          <div className="flex items-center gap-2">
            {/* Share Button */}
            <button
              onClick={() => {
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
              className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
              title="Share Article"
            >
              <Share2 className="w-5 h-5" />
            </button>

            {/* Like Button */}
            <button
              onClick={() => onToggleLike(article)}
              className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
              title={isLiked ? "Unlike Article" : "Like Article"}
            >
              <Heart className={`w-5 h-5 ${isLiked ? 'text-rose-500 fill-current animate-pulse' : ''}`} />
            </button>

            {/* Close Button */}
            <button 
              onClick={onClose}
              className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 md:p-8 flex flex-col gap-6">
          
          {/* Media Tab Switcher */}
          <div className="flex gap-2 p-1 bg-slate-100 dark:bg-slate-900 rounded-xl max-w-xs self-start border border-slate-200/40 dark:border-slate-800/40 shrink-0">
            <button
              onClick={() => setMediaType('image')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-300 ${mediaType === 'image' ? 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 shadow-sm' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
            >
              <span>Story Image</span>
            </button>
            <button
              onClick={() => setMediaType('video')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-300 relative ${mediaType === 'video' ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
            >
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping absolute -top-0.5 -right-0.5" />
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 absolute top-0.5 right-0.5" />
              <span>Video Broadcast</span>
            </button>
          </div>

          {/* Media Player Container */}
          <div className="w-full h-64 md:h-80 rounded-xl bg-slate-100 dark:bg-slate-800 overflow-hidden relative border border-slate-200/20 dark:border-slate-800/30">
            {mediaType === 'image' ? (
              urlToImage ? (
                <img src={urlToImage} alt={title} className="w-full h-full object-cover animate-in fade-in duration-300" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-400 dark:text-slate-600 text-sm">
                  No Preview Image Available
                </div>
              )
            ) : (
              <iframe
                src={getLiveYoutubeEmbedUrl()}
                title="Live News Broadcast"
                className="w-full h-full border-0 animate-in fade-in duration-300"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            )}
            {mediaType === 'image' && <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 to-transparent" />}
          </div>

          {/* Heading */}
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white leading-tight">
            {title}
          </h2>

          {/* Metadata Grid */}
          <div className="flex flex-wrap gap-4 items-center text-sm text-slate-500 dark:text-slate-400 pb-4 border-b border-slate-100 dark:border-slate-800/50">
            {author && (
              <span className="font-medium text-slate-700 dark:text-slate-300">
                By {author}
              </span>
            )}
            <span className="hidden sm:inline">•</span>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-slate-400" />
              <span>{formatModalDate(publishedAt)}</span>
            </div>
            <span className="hidden sm:inline">•</span>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-slate-400" />
              <span>{readTime} min read</span>
            </div>
          </div>

          {/* Key Takeaways Section */}
          <div className="bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-100/50 dark:border-indigo-900/30 rounded-xl p-5 md:p-6 flex flex-col gap-3">
            <div className="flex items-center gap-2 text-indigo-800 dark:text-indigo-300 font-bold text-sm uppercase tracking-wider">
              <Sparkles className="w-4.5 h-4.5 text-indigo-500 animate-pulse" />
              <span>AI Takeaways</span>
            </div>
            <ul className="list-disc list-inside flex flex-col gap-2 text-sm text-slate-700 dark:text-slate-300">
              {takeaways.map((takeaway, i) => (
                <li key={i} className="leading-relaxed pl-1">
                  <span className="ml-1">{takeaway}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Full Text description */}
          <div className="flex flex-col gap-4 text-slate-700 dark:text-slate-300 leading-relaxed text-base">
            <p className="font-medium text-slate-800 dark:text-slate-200">
              {description}
            </p>
            {content && (
              <p>
                {content.replace(/\[\+\d+ chars\]$/, '')}
                <span className="text-slate-400 dark:text-slate-500">
                  (Truncated content by API source)
                </span>
              </p>
            )}
          </div>

          {/* Comments Section */}
          <div className="pt-6 mt-6 border-t border-slate-200/20 dark:border-slate-800/40 flex flex-col gap-6">
            <div className="flex items-center gap-2 text-slate-800 dark:text-white font-extrabold text-lg">
              <MessageSquare className="w-5 h-5 text-indigo-500" />
              <span>Comments ({comments.length})</span>
            </div>

            {/* Comment Form */}
            <form onSubmit={handlePostComment} className="flex flex-col gap-3">
              <div className="flex flex-col sm:flex-row gap-3">
                {/* Author Name Input */}
                <div className="relative flex items-center flex-1 max-w-xs">
                  <User className="absolute left-3 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Your Name (optional)"
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 rounded-xl text-sm focus:outline-none glass-input text-slate-800 dark:text-slate-200"
                  />
                </div>
              </div>
              
              {/* Comment Text Area */}
              <div className="flex gap-2">
                <textarea
                  placeholder="Share your thoughts on this story..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  rows="2"
                  required
                  className="flex-1 px-4 py-2.5 rounded-xl text-sm focus:outline-none glass-input text-slate-800 dark:text-slate-200 resize-none"
                />
                <button
                  type="submit"
                  className="bg-indigo-600 hover:bg-indigo-500 text-white p-3 rounded-xl flex items-center justify-center transition-colors self-end shadow-md hover:shadow-lg transform active:scale-95"
                  title="Post Comment"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </form>

            {/* Comments List */}
            {comments.length === 0 ? (
              <p className="text-sm text-slate-400 dark:text-slate-500 text-center py-6">
                No comments yet. Share your thoughts to start the conversation!
              </p>
            ) : (
              <div className="flex flex-col gap-4 max-h-[300px] overflow-y-auto pr-1">
                {comments.map((comment) => (
                  <div key={comment.id} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200/10 dark:border-slate-800/40 flex flex-col gap-1.5">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-slate-700 dark:text-slate-300">
                        {comment.author}
                      </span>
                      <span className="text-slate-400">
                        {new Date(comment.timestamp).toLocaleDateString(undefined, { dateStyle: 'short', timeStyle: 'short' })}
                      </span>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed break-words">
                      {comment.text}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="sticky bottom-0 z-10 px-6 py-4 glass-panel border-t border-slate-100 dark:border-slate-800/50 flex justify-end">
          {url ? (
            <a
              href={url}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white px-5 py-2.5 rounded-xl font-semibold text-sm shadow-md shadow-indigo-200 dark:shadow-none hover:shadow-lg transition-all duration-300 transform active:scale-95"
            >
              <span>Read Original Article</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          ) : (
            <span className="text-xs text-slate-400 dark:text-slate-500 italic">Original link unavailable</span>
          )}
        </div>

      </div>
    </div>
  )
}
