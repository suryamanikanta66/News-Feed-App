import React, { useState, useEffect } from 'react'
import NewsList from './components/NewsList'
import SearchBar from './components/SearchBar'
import ThemeToggle from './components/ThemeToggle'
import ArticleModal from './components/ArticleModal'
import Toast from './components/Toast'
import WeatherWidget from './components/WeatherWidget'
import NotificationCenter from './components/NotificationCenter'
import { Globe, Cpu, Briefcase, Trophy, Heart, FlaskConical, Bookmark, Home, Newspaper, Languages, Film, MapPin, GraduationCap, Share2 } from 'lucide-react'

export default function App() {
  const [query, setQuery] = useState('latest')
  const [category, setCategory] = useState('')
  const [language, setLanguage] = useState('en')
  const [date, setDate] = useState('')
  const [activeTab, setActiveTab] = useState('home') // 'home' or 'bookmarks'
  const [activeArticle, setActiveArticle] = useState(null)

  // Calculate allowed min (30 days ago) and max (today) dates for NewsAPI free tier
  const todayStr = new Date().toISOString().split('T')[0]
  const thirtyDaysAgo = new Date()
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
  const minDateStr = thirtyDaysAgo.toISOString().split('T')[0]

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'te', name: 'Telugu (తెలుగు)' },
    { code: 'hi', name: 'Hindi (हिन्दी)' },
    { code: 'ta', name: 'Tamil (தமிழ்)' },
    { code: 'kn', name: 'Kannada (ಕನ್ನಡ)' },
    { code: 'ml', name: 'Malayalam (മലയാളം)' },
    { code: 'es', name: 'Spanish' },
    { code: 'fr', name: 'French' },
    { code: 'de', name: 'German' },
    { code: 'it', name: 'Italian' },
    { code: 'pt', name: 'Portuguese' },
    { code: 'ru', name: 'Russian' },
    { code: 'zh', name: 'Chinese' }
  ]
  
  // Bookmarks State loaded from localstorage
  const [bookmarks, setBookmarks] = useState(() => {
    try {
      const saved = localStorage.getItem('news_bookmarks')
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  // Likes State loaded from localstorage
  const [likes, setLikes] = useState(() => {
    try {
      const saved = localStorage.getItem('news_likes')
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  // Toasts State
  const [toasts, setToasts] = useState([])

  // Notifications State loaded from localStorage
  const [notifications, setNotifications] = useState(() => {
    try {
      const saved = localStorage.getItem('news_notifications')
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem('news_notifications', JSON.stringify(notifications))
    } catch (e) {
      console.warn("Storage write blocked:", e)
    }
  }, [notifications])

  const addNotification = (title, description, type = 'info') => {
    const newNotif = {
      id: Date.now().toString() + Math.random().toString().slice(2, 6),
      title,
      description,
      timestamp: new Date().toISOString(),
      read: false,
      type
    }
    setNotifications(prev => [newNotif, ...prev].slice(0, 50)) // limit to 50 alerts
  }

  const handleMarkAsRead = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n))
  }

  const handleMarkAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })))
  }

  const handleClearAll = () => {
    setNotifications([])
  }

  // Listen to Weather Widget location shifts to trigger synced alerts
  useEffect(() => {
    const handleCityChange = (e) => {
      const city = e.detail
      addNotification("📍 Location Synced", `Feed successfully aligned to local reporting in ${city}.`, 'location')
    }
    window.addEventListener('weather_city_changed', handleCityChange)
    return () => window.removeEventListener('weather_city_changed', handleCityChange)
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem('news_bookmarks', JSON.stringify(bookmarks))
    } catch (e) {
      console.warn("Storage write blocked:", e)
    }
  }, [bookmarks])

  useEffect(() => {
    try {
      localStorage.setItem('news_likes', JSON.stringify(likes))
    } catch (e) {
      console.warn("Storage write blocked:", e)
    }
  }, [likes])

  const addToast = (message, type = 'info') => {
    const id = Date.now().toString()
    setToasts(prev => [...prev, { id, message, type }])
  }

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }

  const handleToggleBookmark = (article) => {
    const isBookmarked = bookmarks.some(b => 
      (b.url && article.url && b.url === article.url) || 
      (b.title && article.title && b.title === article.title)
    )
    if (isBookmarked) {
      setBookmarks(prev => prev.filter(b => 
        !((b.url && article.url && b.url === article.url) || 
          (b.title && article.title && b.title === article.title))
      ))
      addToast('Removed from Saved Articles', 'delete')
    } else {
      setBookmarks(prev => [...prev, article])
      addToast('Saved to Bookmarks', 'success')
      addNotification("🔖 Article Bookmarked", article.title || 'Untitled Article', 'bookmark')
    }
  }

  const handleExportBookmarks = () => {
    if (bookmarks.length === 0) {
      addToast("No bookmarked articles to export!", "info")
      return
    }
    try {
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(bookmarks))
      const downloadAnchor = document.createElement('a')
      downloadAnchor.setAttribute("href", dataStr)
      downloadAnchor.setAttribute("download", "newsfeed_bookmarks.json")
      document.body.appendChild(downloadAnchor)
      downloadAnchor.click()
      downloadAnchor.remove()
      addToast("Bookmarks exported successfully!", "success")
    } catch (err) {
      console.error(err)
      addToast("Failed to export bookmarks.", "delete")
    }
  }

  const handleImportBookmarks = (e) => {
    const fileReader = new FileReader()
    const file = e.target.files[0]
    if (!file) return

    fileReader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target.result)
        if (Array.isArray(parsed)) {
          setBookmarks(prev => {
            const combined = [...prev, ...parsed]
            const seen = new Set()
            return combined.filter(b => {
              if (!b.url || seen.has(b.url)) return false
              seen.add(b.url)
              return true
            })
          })
          addToast(`Successfully imported ${parsed.length} bookmarks!`, "success")
          addNotification("📥 Bookmarks Imported", `${parsed.length} articles added to your bookmarks list.`, 'bookmark')
        } else {
          throw new Error("Parsed data is not an array")
        }
      } catch (err) {
        console.error(err)
        addToast("Failed to import. Make sure it is a valid bookmarks JSON file.", "delete")
      }
    }
    fileReader.readAsText(file)
    e.target.value = '' // Clear input
  }

  const handleToggleLike = (article) => {
    const isLiked = likes.some(l => 
      (l.url && article.url && l.url === article.url) || 
      (l.title && article.title && l.title === article.title)
    )
    if (isLiked) {
      setLikes(prev => prev.filter(l => 
        !((l.url && article.url && l.url === article.url) || 
          (l.title && article.title && l.title === article.title))
      ))
      addToast('Removed like from article', 'delete')
    } else {
      setLikes(prev => [...prev, article])
      addToast('Liked article!', 'success')
      addNotification("❤️ Article Liked", article.title || 'Untitled Article', 'like')
    }
  }

  // Category items with matching icons
  const categories = [
    { id: '', name: 'All News', icon: <Globe className="w-4 h-4" /> },
    { id: 'local', name: 'Local News', icon: <MapPin className="w-4 h-4" /> },
    { id: 'technology', name: 'Tech', icon: <Cpu className="w-4 h-4" /> },
    { id: 'business', name: 'Business', icon: <Briefcase className="w-4 h-4" /> },
    { id: 'sports', name: 'Sports', icon: <Trophy className="w-4 h-4" /> },
    { id: 'entertainment', name: 'Movies', icon: <Film className="w-4 h-4" /> },
    { id: 'health', name: 'Health', icon: <Heart className="w-4 h-4" /> },
    { id: 'science', name: 'Science', icon: <FlaskConical className="w-4 h-4" /> },
    { id: 'education', name: 'Education', icon: <GraduationCap className="w-4 h-4" /> },
    { id: 'socialmedia', name: 'Social Media', icon: <Share2 className="w-4 h-4" /> }
  ]

  const handleSearch = (q) => {
    setQuery(q)
    // Automatically switch back to home view when user initiates a search
    setActiveTab('home')
    addToast(`Searching for "${q}"...`, 'info')
  }

  return (
    <div className="min-h-screen text-slate-900 dark:text-slate-100 transition-colors flex flex-col relative bg-slate-50 dark:bg-slate-950">
      
      {/* Rotating Background Globe Element */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute w-[160vw] h-[160vw] min-w-[1000px] min-h-[1000px] top-1/2 left-1/2 rounded-full news-bg-image animate-spin-slow opacity-50 dark:opacity-45" />
        
        {/* Holographic 3D Orbit Lines (Circle Routed Background) */}
        <div className="absolute top-1/2 left-1/2 w-[70vw] h-[70vw] min-w-[500px] min-h-[500px] rounded-full border border-sky-500/25 dark:border-sky-400/15 animate-orbit-1" />
        <div className="absolute top-1/2 left-1/2 w-[90vw] h-[90vw] min-w-[700px] min-h-[700px] rounded-full border border-dashed border-cyan-500/20 dark:border-cyan-400/15 animate-orbit-2" />
        <div className="absolute top-1/2 left-1/2 w-[110vw] h-[110vw] min-w-[900px] min-h-[900px] rounded-full border border-double border-indigo-500/15 dark:border-indigo-400/10 animate-orbit-3" />
        
        <div className="absolute inset-0 bg-slate-50/92 dark:bg-slate-950/88 transition-colors" />
      </div>

      {/* Main App Content Container */}
      <div className="relative z-10 flex flex-col min-h-screen">
      
      {/* Sticky Header */}
      <header className="sticky top-0 z-30 w-full glass-panel border-b border-slate-200/50 dark:border-slate-800/50 shadow-sm">
        <div className="container py-4 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Logo / Brand Name */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl relative overflow-hidden flex items-center justify-center text-white font-black text-sm shadow-md border border-sky-500/20 shrink-0">
              {/* Spinning Mini Globe Background */}
              <div className="absolute w-[200%] h-[200%] top-1/2 left-1/2 rounded-full news-bg-image animate-spin-slow opacity-90" />
              {/* Tint Overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-sky-600/70 to-cyan-500/50 mix-blend-multiply" />
              {/* Text */}
              <span className="relative z-10 drop-shadow-[0_1.5px_2px_rgba(0,0,0,0.6)] font-black tracking-wider text-xs">
                NF
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400">
              NewsFeed
            </h1>
            <span className="text-[10px] uppercase font-bold tracking-widest bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 px-2 py-0.5 rounded-full border border-slate-200 dark:border-slate-700">
              V2
            </span>
          </div>

          {/* Search bar and theme controls */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-end">
            <SearchBar onSearch={handleSearch} />
            
            {/* Language Selector */}
            <div className="relative flex items-center shrink-0">
              <Languages className="absolute left-3 w-4 h-4 text-slate-400 pointer-events-none" />
              <select
                value={language}
                onChange={(e) => {
                  setLanguage(e.target.value)
                  addToast(`Language changed to ${languages.find(l => l.code === e.target.value)?.name}`, 'info')
                }}
                className="pl-9 pr-8 py-2 rounded-xl text-sm font-medium focus:outline-none glass-input text-slate-700 dark:text-slate-200 appearance-none cursor-pointer"
              >
                {languages.map(lang => (
                  <option key={lang.code} value={lang.code} className="bg-white dark:bg-slate-900">
                    {lang.name}
                  </option>
                ))}
              </select>
              <div className="absolute right-3 pointer-events-none text-slate-400 text-[10px]">▼</div>
            </div>

            <NotificationCenter 
              notifications={notifications} 
              onMarkAsRead={handleMarkAsRead}
              onMarkAllAsRead={handleMarkAllAsRead}
              onClearAll={handleClearAll}
            />

            <ThemeToggle />
          </div>

        </div>
      </header>

      {/* Main Container */}
      <main className="container flex-1 py-8 flex flex-col gap-6">
        
        {/* Weather Report Widget */}
        <WeatherWidget />
        
        {/* Navigation & Controls Row */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 pb-4 border-b border-slate-200/50 dark:border-slate-800/50">
          
          {/* Date Filter */}
          <div className="flex flex-wrap items-center gap-3">
              <div className="relative flex items-center shrink-0">
                <input
                  type="date"
                  value={date}
                  min={minDateStr}
                  max={todayStr}
                  onChange={(e) => {
                    setDate(e.target.value)
                    if (e.target.value) {
                      addToast(`Filtering news for ${e.target.value}`, 'info')
                    } else {
                      addToast('Reset date filter', 'info')
                    }
                  }}
                  className="pl-3 pr-8 py-2 rounded-xl text-sm font-semibold focus:outline-none glass-input text-slate-700 dark:text-slate-200 cursor-pointer"
                  title="Filter news by publication date"
                />
                {date && (
                  <button
                    onClick={() => {
                      setDate('')
                      addToast('Cleared date filter', 'info')
                    }}
                    className="absolute right-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors p-0.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
                    title="Clear Date"
                  >
                    ✕
                  </button>
                )}
              </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex gap-2 items-center overflow-x-auto pb-2 sm:pb-0 scrollbar-none scroll-smooth">
            {categories.map(cat => (
              <button
                key={cat.id || 'all'}
                onClick={() => {
                  setCategory(cat.id)
                  addToast(`Filtering by category: ${cat.name}`, 'info')
                }}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-2xl border text-sm font-semibold transition-all duration-300 whitespace-nowrap transform active:scale-95 ${category === cat.id ? 'bg-indigo-600 border-indigo-600 text-white shadow-md shadow-indigo-100 dark:shadow-none' : 'glass-card text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/80 border-slate-200/50 dark:border-slate-800/50'}`}
              >
                {cat.icon}
                <span>{cat.name}</span>
              </button>
            ))}
          </div>

        </div>

        {/* Query Info Alert for search mode */}
        {query !== 'latest' && (
          <div className="flex items-center justify-between px-5 py-3 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-100/40 dark:border-indigo-900/30 text-indigo-800 dark:text-indigo-300 text-sm font-medium">
            <div className="flex items-center gap-2">
              <Newspaper className="w-4 h-4" />
              <span>Showing search results for: <strong>"{query}"</strong></span>
            </div>
            <button 
              onClick={() => {
                setQuery('latest')
                addToast('Reset search query', 'info')
              }}
              className="text-xs hover:underline font-bold uppercase tracking-wider"
            >
              Reset Search
            </button>
          </div>
        )}

        {/* Content Section */}
        <NewsList 
          query={query} 
          category={category} 
          language={language}
          date={date}
          bookmarks={bookmarks}
          onToggleBookmark={handleToggleBookmark}
          likes={likes}
          onToggleLike={handleToggleLike}
          onOpenDetails={(article) => setActiveArticle(article)}
          isBookmarksView={false}
          addToast={addToast}
          onAddNotification={addNotification}
          onExportBookmarks={handleExportBookmarks}
          onImportBookmarks={handleImportBookmarks}
        />
      </main>

      {/* Footer */}
      <footer className="w-full py-8 mt-12 border-t border-slate-200/40 dark:border-slate-800/40 text-center text-xs font-medium text-slate-400 dark:text-slate-500">
        <div className="container flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} NewsFeed Corp. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            Built with ❤️ & React + Vite
          </p>
        </div>
      </footer>

      {/* Article Detail Modal Reader Overlay */}
      {activeArticle && (
        <ArticleModal 
          article={activeArticle} 
          onClose={() => setActiveArticle(null)}
          isBookmarked={bookmarks.some(b => 
            (b.url && activeArticle.url && b.url === activeArticle.url) || 
            (b.title && activeArticle.title && b.title === activeArticle.title)
          )}
          onToggleBookmark={handleToggleBookmark}
          isLiked={likes.some(l => 
            (l.url && activeArticle.url && l.url === activeArticle.url) || 
            (l.title && activeArticle.title && l.title === activeArticle.title)
          )}
          onToggleLike={handleToggleLike}
          language={language}
          addToast={addToast}
        />
      )}

      {/* Toast Alert System overlay */}
      <Toast toasts={toasts} removeToast={removeToast} />

      </div>
    </div>
  )
}