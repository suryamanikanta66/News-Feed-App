import React, { useEffect, useState } from 'react'
import useNews from '../hooks/useNews'
import ArticleCard from './ArticleCard'
import SkeletonCard from './SkeletonCard'
import AiChatbot from './AiChatbot'
import { Calendar, Clock, Bookmark, Newspaper, AlertCircle, RefreshCw, Heart, Share2 } from 'lucide-react'

const liveAlerts = {
  en: [
    "SpaceX successfully launches first manned expedition to Mars orbital habitat.",
    "Central banks announce unified digital currency liquidity framework.",
    "Quantum computing startup achieves stable 10,000 physical qubit logic gate.",
    "Scientists report breakthrough biological catalyst that splits water into hydrogen at 98% efficiency.",
    "Global trade flows reach historic velocity following automation of maritime corridors.",
    "Astronomers capture first high-resolution radio image of stellar nurseries in Andromeda.",
    "Leading tech developer releases fully autonomous compiler reducing app cycle to seconds.",
    "Global Stock Index breaks historical highs as interest rate cuts stimulate new venture investments.",
    "New targeted cellular therapies report 99% remission rate in latest lung oncology studies.",
    "Global Grid operators deploy AI-driven grid redistributors to successfully resolve extreme summer peaks."
  ],
  te: [
    "అంతరిక్ష ప్రయోగాల్లో నవ శకం: అంగారక కక్ష్యలోకి విజయవంతంగా ప్రవేశించిన మానవసహిత నౌక.",
    "ప్రపంచ మార్కెట్లలో సరికొత్త రికార్డు: పసిడి ధరలు ఒక్కసారిగా భారీగా తగ్గుముఖం.",
    "టెక్నాలజీ రంగంలో సంచలనం: సరికొత్త క్వాంటం కంప్యూటింగ్ ఆవిష్కరణ.",
    "పర్యావరణ హిత ఇంధన రంగంలో ముందడుగు: నీటి నుండి హైడ్రోజన్ తయారీ సులభతరం.",
    "టాలీవుడ్ సంచలనం: అగ్ర దర్శకుడితో ప్రపంచవ్యాప్త గ్లోబల్ ప్రాజెక్ట్ ఖరారు."
  ],
  hi: [
    "अंतरिक्ष अन्वेषण में नया युग: पहली बार मंगल की कक्षा में मानवयुक्त यान का सफल प्रवेश।",
    "वैश्विक बाजारों में सोने की कीमतों में भारी गिरावट दर्ज की गई।",
    "प्रौद्योगिकी जगत में हलचल: रूम-टेम्परेचर क्वांटम सुपरकंप्यूटर का अनावरण।",
    "ऊर्जा क्षेत्र में क्रांति: वैज्ञानिकों ने पानी को 98% दक्षता से हाइड्रोजन में बदलने का दावा किया।"
  ],
  ta: [
    "விண்வெளி ஆராய்ச்சியில் புதிய மைல்கல்: செவ்வாய் சுற்றுப்பாதையில் மனித நலம் சார்ந்த விண்கலம் நுழைந்தது.",
    "தங்க விலையில் அதிரடி சரிவு: முதலீட்டாளர்கள் மற்றும் நுகர்வோர் மகிழ்ச்சி.",
    "புதிய குவாண்டம் கணினி தொழில்நுட்ப ஆவிஷ்காரம் அறிமுகம் செய்யப்பட்டது.",
    "சுற்றுச்சூழல் எரிபொருள் துறையில் முன்னேற்றம்: நீரிலிருந்து ஹைட்ரஜன் தயாரிப்பு எளிதாகிறது."
  ],
  kn: [
    "ಬಾಹ್ಯಾಕಾಶ ಕ್ಷೇತ್ರದಲ್ಲಿ ಹೊಸ ಮೈಲಿಗಲ್ಲು: ಮಂಗಳನ ಕಕ್ಷೆಗೆ ಯಶಸ್ವಿಯಾಗಿ ಸೇರಿದ ಗಗನನೌಕೆ.",
    "ಚಿನ್ನದ ಬೆಲೆಯಲ್ಲಿ ಭಾರಿ ಕುಸಿತ: ಸಾರ್ವಜನಿಕರಿಗೆ ಮತ್ತು ಕೊಳ್ಳುಗರಿಗೆ ಭಾರಿ ನಿರಾಳ.",
    "ಹೊಸ ಕ್ವಾಂಡಮ್ ಕಂಪ್ಯೂಟಿಂಗ್ ತಂತ್ರಜ್ಞಾನ ಲೋಕಕ್ಕೆ ಅನಾವರಣಗೊಂಡಿದೆ.",
    "ಹಸಿರು ಇಂಧನ ಕ್ಷೇತ್ರದಲ್ಲಿ ಮುನ್ನಡೆ: ನೀರಿನಿಂದ ಹೈಡ್ರೋಜನ್ ಉತ್ಪಾದನೆ ಸುಲಭ."
  ],
  ml: [
    "ബഹിരാകാശ ഗവേഷണത്തിൽ പുതിയ ചരിത്രം: ചൊവ്വാ ഭ്രമണപഥത്തിൽ മനുഷ്യ പേടകം വിജയകരമായി പ്രവേശിച്ചു.",
    "സ്വർണ്ണ വിലയിൽ വൻ ഇടിവ്: വിപണിയിലും ഉപഭോക്താക്കൾക്കിടയിലും വൻ ഉണർവ്വ്.",
    "സാങ്കೇതിക രംഗത്ത് വിപ്ലവം: പുതിയ ക്വാണ്ടം കമ്പ്യൂട്ടിങ് പ്ലാറ്റ്ഫോം പുറത്തിറക്കി.",
    "ഹരിത ഊർജ്ജ രംഗത്ത് നിർണ്ണായക മുന്നേറ്റം: ജലത്തിൽ നിന്ന് ഹൈഡ്രജൻ വേർതിരിച്ചെടുക്കൽ സുഗമമാക്കുന്നു."
  ],
  es: [
    "SpaceX lanza con éxito la primera misión tripulada al hábitat orbital de Marte.",
    "Los bancos centrales anuncian un marco unificado para monedas digitales.",
    "Desarrollan un catalizador biológico que divide el agua en hidrógeno con un 98% de eficiencia.",
    "Los mercados globales alcanzan máximos históricos tras los informes de estabilidad."
  ],
  fr: [
    "SpaceX lance avec succès la première mission habitée vers l'orbite martienne.",
    "Les banques centrales annoncent un cadre unifié pour les monnaies numériques.",
    "Découverte d'un catalyseur biologique convertissant l'eau en hydrogène avec une efficacité de 98%."
  ],
  de: [
    "SpaceX startet erfolgreich erste bemannte Mission zum Mars-Orbit.",
    "Zentralbanken kündigen einheitlichen Rahmen für digitale Währungen an.",
    "Wissenschaftler entwickeln biologischen Katalysator zur Wasserstoffgewinnung mit 98% Effizienz."
  ],
  it: [
    "SpaceX lancia con successo la prima missione con equipaggio verso l'orbita di Marte.",
    "Le banche centrali annunciano un quadro unificato per le valute digitali."
  ],
  pt: [
    "SpaceX lança com sucesso a primeira missão tripulada à órbita de Marte.",
    "Bancos centrais anunciam estrutura unificada para moedas digitais."
  ],
  ru: [
    "SpaceX успешно запустила первую пилотируемую экспедицию на орбиту Марса.",
    "Центральные банки объявили о создании единой системы цифровых валют."
  ],
  zh: [
    "SpaceX 成功发射首个载人火星轨道太空舱旅行任务。",
    "各国央行宣布建立统一的数字货币流动性清算网络。"
  ]
}

export default function NewsList({ query, category, language, date, bookmarks, onToggleBookmark, likes = [], onToggleLike, onOpenDetails, isBookmarksView = false, addToast, onAddNotification, onExportBookmarks, onImportBookmarks }) {
  
  // Conditionally call hook to prevent unnecessary fetches in bookmarks view
  const { articles, loading, error, page, setPage, hasMore } = isBookmarksView 
    ? { articles: [], loading: false, error: null, page: 1, setPage: () => {}, hasMore: false }
    : useNews({ query, category, language, date, pageSize: 10 })

  const [liveArticles, setLiveArticles] = useState([])

  const displayArticles = isBookmarksView ? bookmarks : [...liveArticles, ...articles]
  const isBookmarked = (art) => bookmarks.some(b => b.url === art.url)
  const isLiked = (art) => likes.some(l => l.url === art.url)

  // Reset live injected articles when filter parameters change
  useEffect(() => {
    setLiveArticles([])
  }, [query, category, language, date])

  // Inject a live breaking news alert every 60 seconds (1 minute) for real-time experience
  useEffect(() => {
    if (isBookmarksView) return

    const interval = setInterval(() => {
      const alerts = liveAlerts[language] || liveAlerts['en']
      const randomIndex = Math.floor(Math.random() * alerts.length)
      const alertText = alerts[randomIndex]

      const newAlert = {
        title: "🔴 LIVE WIRE: " + alertText,
        description: language === 'te' 
          ? "తాజా అంతర్జాతీయ సమాచారం ప్రకారం ఈ ప్రత్యేక నివేదిక అందుతోంది."
          : "Breaking real-time updates arriving continuously from our global bureaux.",
        content: "This is a real-time live bulletin update. Local correspondents are compiling further telemetry.",
        urlToImage: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=800&q=80',
        url: "https://example.com/live-alert-" + Date.now(),
        source: { name: "Global Bureau" },
        publishedAt: new Date().toISOString(),
        author: "Desk Editor"
      }

      setLiveArticles(prev => [newAlert, ...prev])
      addToast(`🔴 Breaking News: ${alertText.slice(0, 45)}...`, 'info')
      if (onAddNotification) {
        onAddNotification("🔴 Breaking Bulletin", alertText, 'bulletin')
      }
    }, 60000)

    return () => clearInterval(interval)
  }, [language, isBookmarksView, query, category, date])

  // Infinite Scroll IntersectionObserver implementation
  useEffect(() => {
    if (isBookmarksView || !hasMore || loading) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          // Auto-trigger loading next page when sentinel is in view
          setPage(p => p + 1)
        }
      },
      {
        rootMargin: '250px' // Pre-fetch next page 250px before scroll hits the bottom for a seamless experience
      }
    )

    const sentinel = document.getElementById('infinite-scroll-sentinel')
    if (sentinel) {
      observer.observe(sentinel)
    }

    return () => {
      if (sentinel) {
        observer.unobserve(sentinel)
      }
      observer.disconnect()
    }
  }, [hasMore, loading, setPage, isBookmarksView])

  if (isBookmarksView) {
    if (displayArticles.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-16 px-4 text-center glass-panel rounded-3xl border border-slate-200/50 dark:border-slate-800/50 max-w-lg mx-auto animate-float">
          <div className="p-4 rounded-full bg-indigo-50 dark:bg-indigo-950/30 text-indigo-500 mb-4">
            <Bookmark className="w-10 h-10" />
          </div>
          <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">No Saved Articles</h3>
          <p className="text-slate-500 dark:text-slate-400 text-sm max-w-xs mb-6">
            Articles you bookmark will appear here so you can read them later.
          </p>
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl cursor-pointer shadow-md transition-all active:scale-95">
              <span>Import Bookmarks JSON</span>
              <input 
                type="file" 
                accept=".json" 
                onChange={onImportBookmarks} 
                className="hidden" 
              />
            </label>
          </div>
        </div>
      )
    }

    return (
      <div className="flex flex-col gap-6 animate-in fade-in duration-300">
        {/* Backup controls row */}
        <div className="flex justify-between items-center bg-white/40 dark:bg-slate-900/40 p-3.5 rounded-2xl border border-slate-200/35 dark:border-slate-800/35 backdrop-blur-sm shadow-sm">
          <span className="text-[10px] sm:text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest pl-2">
            Backup & Sync Saved News
          </span>
          <div className="flex items-center gap-4 text-xs font-bold">
            <label className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors cursor-pointer">
              <span>Import JSON</span>
              <input type="file" accept=".json" onChange={onImportBookmarks} className="hidden" />
            </label>
            <span className="text-slate-300 dark:text-slate-700">|</span>
            <button 
              onClick={onExportBookmarks}
              className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
            >
              Export JSON
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayArticles.map((a, idx) => (
            <ArticleCard 
              key={a.url || idx} 
              article={a} 
              isBookmarked={true}
              onToggleBookmark={onToggleBookmark}
              isLiked={isLiked(a)}
              onToggleLike={onToggleLike}
              onOpenDetails={() => onOpenDetails(a)}
              addToast={addToast}
            />
          ))}
        </div>
      </div>
    )
  }

  // Load States
  if (loading && page === 1) {
    return (
      <div className="flex flex-col gap-8">
        {/* Featured Hero Skeleton */}
        <div className="w-full h-96 rounded-3xl bg-slate-200 dark:bg-slate-800 animate-pulse hidden md:block" />
        {/* Secondary Grid Skeletons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, idx) => (
            <SkeletonCard key={idx} />
          ))}
        </div>
      </div>
    )
  }

  // Error State
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4 text-center glass-panel rounded-3xl border border-rose-100 dark:border-rose-950/30 max-w-lg mx-auto">
        <div className="p-4 rounded-full bg-rose-50 dark:bg-rose-950/20 text-rose-500 mb-4">
          <AlertCircle className="w-10 h-10" />
        </div>
        <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">Failed to load news</h3>
        <p className="text-slate-500 dark:text-slate-400 text-sm mb-5">
          {error.includes('VITE_NEWS_API_KEY') 
            ? 'News API key is missing. Please set VITE_NEWS_API_KEY in your env file to retrieve live stories.' 
            : `Error: ${error}`}
        </p>
        <button 
          onClick={() => window.location.reload()}
          className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 px-4 py-2 rounded-xl text-sm font-semibold transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Reload Feed</span>
        </button>
      </div>
    )
  }

  if (displayArticles.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 text-center glass-panel rounded-3xl border border-slate-200/50 dark:border-slate-800/50 max-w-lg mx-auto">
        <div className="p-4 rounded-full bg-slate-50 dark:bg-slate-800/50 text-slate-400 mb-4">
          <Newspaper className="w-10 h-10" />
        </div>
        <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">No Articles Found</h3>
        <p className="text-slate-500 dark:text-slate-400 text-sm">
          Try expanding your search query or choosing another category.
        </p>
      </div>
    )
  }

  // Split featured card and grid list
  const featuredArticle = page === 1 ? displayArticles[0] : null
  const secondaryArticles = page === 1 ? displayArticles.slice(1) : displayArticles

  // Word count & read time for featured
  const featuredWordCount = featuredArticle 
    ? (featuredArticle.description?.split(/\s+/)?.length || 0) + (featuredArticle.content?.split(/\s+/)?.length || 0)
    : 0
  const featuredReadTime = Math.max(1, Math.round(featuredWordCount / 200) + 1)

  return (
    <section className="flex flex-col gap-8 animate-in fade-in duration-300">
      
      {/* Scrolling Live News Ticker Bar */}
      {!isBookmarksView && displayArticles.length > 0 && (
        <div className="w-full bg-slate-900/90 dark:bg-slate-900/40 backdrop-blur-md text-white py-2.5 px-4 flex items-center overflow-hidden border border-slate-200/20 dark:border-slate-800/30 rounded-2xl shadow-sm z-10 shrink-0 relative text-xs">
          {/* Red Live Indicator */}
          <div className="flex items-center gap-1.5 font-black uppercase tracking-wider text-rose-500 bg-rose-500/10 px-2.5 py-1 rounded-lg border border-rose-500/20 mr-4 shrink-0 shadow-sm animate-pulse">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping" />
            <span>Live Bulletins</span>
          </div>
          
          {/* Scrolling Marquee container */}
          <div className="relative flex-1 overflow-hidden h-4">
            <div className="absolute whitespace-nowrap animate-marquee flex gap-16 items-center">
              {displayArticles.slice(0, 8).map((art, idx) => (
                <span key={idx} className="font-semibold text-slate-100 dark:text-slate-200 flex items-center gap-2 cursor-pointer hover:text-sky-400 transition-colors" onClick={() => onOpenDetails(art)}>
                  <span className="text-sky-400 font-black">•</span>
                  {art.title}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
      
      {/* Featured Hero Article */}
      {featuredArticle && (
        <div 
          onClick={() => onOpenDetails(featuredArticle)}
          className="group grid grid-cols-1 md:grid-cols-12 rounded-3xl overflow-hidden glass-card hover:bg-white/80 dark:hover:bg-slate-900/80 hover:shadow-2xl border border-slate-200/50 dark:border-slate-800/50 transition-all duration-300 cursor-pointer"
        >
          {/* Left Column Image */}
          <div className="md:col-span-7 h-64 sm:h-80 md:h-[420px] w-full bg-slate-100 dark:bg-slate-800 relative overflow-hidden">
            {featuredArticle.urlToImage ? (
              <img 
                src={featuredArticle.urlToImage} 
                alt={featuredArticle.title} 
                className="object-cover w-full h-full group-hover:scale-103 transition-transform duration-500 ease-out" 
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-slate-400 dark:text-slate-600 text-sm">
                No Preview Image
              </div>
            )}
            
            {/* Share button overlay */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                if (navigator.share) {
                  navigator.share({
                    title: featuredArticle.title,
                    text: featuredArticle.description,
                    url: featuredArticle.url
                  }).catch(() => {})
                } else {
                  navigator.clipboard.writeText(featuredArticle.url)
                  addToast('Article link copied to clipboard!', 'success')
                }
              }}
              className="absolute top-6 right-32 z-10 p-2.5 rounded-xl bg-white/85 dark:bg-slate-950/80 backdrop-blur-md border border-slate-200/50 dark:border-slate-800/50 text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:scale-110 active:scale-95 transition-all duration-200 shadow-sm"
              title="Share Article"
            >
              <Share2 className="w-5 h-5" />
            </button>

            {/* Like button overlay */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                onToggleLike(featuredArticle)
              }}
              className="absolute top-6 right-19 z-10 p-2.5 rounded-xl bg-white/85 dark:bg-slate-950/80 backdrop-blur-md border border-slate-200/50 dark:border-slate-800/50 text-slate-600 dark:text-slate-300 hover:text-rose-600 dark:hover:text-rose-400 hover:scale-110 active:scale-95 transition-all duration-200 shadow-sm"
              title={isLiked(featuredArticle) ? "Unlike Article" : "Like Article"}
            >
              <Heart className={`w-5 h-5 ${isLiked(featuredArticle) ? 'text-rose-600 dark:text-rose-400 fill-current animate-pulse' : ''}`} />
            </button>



            {/* Featured Badge */}
            <div className="absolute top-6 left-6 px-3 py-1 rounded-lg bg-indigo-600 text-xs font-bold text-white shadow-md uppercase tracking-wider">
              Featured Story
            </div>

            {/* Video available indicator */}
            <div className="absolute bottom-6 left-6 px-2.5 py-1 rounded-lg bg-rose-600/90 backdrop-blur-sm text-[10px] font-black text-white flex items-center gap-1 shadow-sm uppercase tracking-widest border border-rose-500/30">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
              <span>Video Broadcast Available</span>
            </div>
          </div>

          {/* Right Column Text Details */}
          <div className="md:col-span-5 p-6 sm:p-8 md:p-10 flex flex-col justify-between gap-6">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3 text-xs text-slate-400 dark:text-slate-500">
                {featuredArticle.source?.name && (
                  <span className="font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wide">
                    {featuredArticle.source.name}
                  </span>
                )}
                <span>•</span>
                <div className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{new Date(featuredArticle.publishedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{featuredReadTime} min read</span>
                </div>
              </div>

              <h2 className="font-extrabold text-2xl sm:text-3xl text-slate-800 dark:text-white leading-tight group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                {featuredArticle.title}
              </h2>

              <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-4">
                {featuredArticle.description}
              </p>
            </div>

            <div className="flex items-center gap-2 text-sm font-semibold text-indigo-600 dark:text-indigo-400">
              <span>Read Full Article</span>
              <div className="w-5 h-5 rounded-full bg-indigo-50 dark:bg-indigo-950/40 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                →
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Grid of articles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {secondaryArticles.map((a, idx) => (
          <ArticleCard 
            key={a.url || idx} 
            article={a} 
            isBookmarked={isBookmarked(a)}
            onToggleBookmark={onToggleBookmark}
            isLiked={isLiked(a)}
            onToggleLike={onToggleLike}
            onOpenDetails={() => onOpenDetails(a)}
            addToast={addToast}
          />
        ))}
      </div>

      {/* Sentinel indicator element for infinite scroll */}
      {!isBookmarksView && hasMore && (
        <div id="infinite-scroll-sentinel" className="w-full flex items-center justify-center py-8 mt-4 border-t border-slate-200/20 dark:border-slate-800/20 pointer-events-none">
          {loading ? (
            <div className="flex items-center gap-2 text-sky-600 dark:text-sky-400 font-bold text-xs tracking-widest uppercase animate-pulse">
              <RefreshCw className="w-4 h-4 animate-spin text-sky-500" />
              <span>Fetching more articles...</span>
            </div>
          ) : (
            <div className="text-slate-400 dark:text-slate-600 text-[10px] uppercase font-semibold tracking-wider">
              Scroll down to load more stories
            </div>
          )}
        </div>
      )}

      {/* AI Doubt Clearer Chatbot overlay widget */}
      <AiChatbot articles={displayArticles} addToast={addToast} />
    </section>
  )
}