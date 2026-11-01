import { useState, useEffect } from 'react'
import { getMockArticles } from './mockNews'

const API_KEY = import.meta.env.VITE_NEWS_API_KEY

const categoryImages = {
  technology: [
    'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1563770660941-20978e870e26?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1535378917042-10a22c95931a?auto=format&fit=crop&w=800&q=80'
  ],
  business: [
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1544377193-33dcf4d68fb5?auto=format&fit=crop&w=800&q=80'
  ],
  sports: [
    'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1530541930197-ff16ac917b0e?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1541252260730-0412e8e2108e?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1599447421416-3414500d18a5?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1593787406536-3676a152d9cb?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1534158914592-062992fbe900?auto=format&fit=crop&w=800&q=80'
  ],
  science: [
    'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1532187643603-ba119ca4109e?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1567427017947-545c5f89c60a?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1544006659-f0b21f04cb1d?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80'
  ],
  health: [
    'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1530026405186-ed1ea0ac7a63?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&w=800&q=80'
  ],
  entertainment: [
    'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1478812954026-9c750f0e89fc?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1514306191717-452ec28c7814?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80'
  ],
  education: [
    'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80'
  ],
  socialmedia: [
    'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?auto=format&fit=crop&w=800&q=80'
  ],
  general: [
    'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1495020689067-958852a6565d?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1518382473185-2c5d1a45152a?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1504151932400-72d4384f04b3?auto=format&fit=crop&w=800&q=80'
  ]
}

const getDeterministicImage = (title, category) => {
  const activeCategory = category || 'general'
  const list = categoryImages[activeCategory] || categoryImages['general']
  if (!title) return list[0]
  
  let hash = 0
  for (let i = 0; i < title.length; i++) {
    hash = title.charCodeAt(i) + ((hash << 5) - hash)
  }
  const index = Math.abs(hash) % list.length
  return list[index]
}

export default function useNews({ query, category, language = 'en', date = '', pageSize = 12 }) {
  const [articles, setArticles] = useState([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [hasMore, setHasMore] = useState(true)
  const [refreshKey, setRefreshKey] = useState(0)
  const [localCityKey, setLocalCityKey] = useState(0)

  // Reset feed state when query, category, language, or date filters change
  useEffect(() => {
    setArticles([])
    setPage(1)
    setHasMore(true)
  }, [query, category, language, date])

  // Listen to GPS Weather Widget location shifts to live reload local feed on changes
  useEffect(() => {
    const handleCityChange = () => {
      setPage(1)
      setArticles([])
      setLocalCityKey(prev => prev + 1)
    }
    window.addEventListener('weather_city_changed', handleCityChange)
    return () => window.removeEventListener('weather_city_changed', handleCityChange)
  }, [])

  // Automatically refresh feed page 1 every 1 minute (60,000 ms) to load today's newest updates
  useEffect(() => {
    const interval = setInterval(() => {
      setPage(1)
      setRefreshKey(prev => prev + 1)
    }, 60000)
    return () => clearInterval(interval)
  }, [])

  // Helper to fetch and parse official Google News RSS feed via free rss2json service
  const fetchGoogleNewsRSS = async (q, category, language, pageNum = 1) => {
    let hl = 'en', gl = 'US';
    if (language === 'te') { hl = 'te'; gl = 'IN'; }
    else if (language === 'hi') { hl = 'hi'; gl = 'IN'; }
    else if (language === 'ta') { hl = 'ta'; gl = 'IN'; }
    else if (language === 'kn') { hl = 'kn'; gl = 'IN'; }
    else if (language === 'ml') { hl = 'ml'; gl = 'IN'; }
    else if (language === 'es') { hl = 'es-419'; gl = 'US'; }
    else if (language === 'fr') { hl = 'fr'; gl = 'FR'; }
    else if (language === 'de') { hl = 'de'; gl = 'DE'; }
    else if (language === 'it') { hl = 'it'; gl = 'IT'; }
    else if (language === 'pt') { hl = 'pt-419'; gl = 'BR'; }
    else if (language === 'ru') { hl = 'ru'; gl = 'RU'; }
    else if (language === 'zh') { hl = 'zh-CN'; gl = 'CN'; }
    
    // Paginate by generating different related search query variations for RSS segments
    let rssUrls = [];
    
    if (q && q !== 'latest') {
      if (pageNum === 1) {
        rssUrls.push(`https://news.google.com/rss/search?q=${encodeURIComponent(q)}&hl=${hl}&gl=${gl}&ceid=${gl}:${hl}`);
        rssUrls.push(`https://news.google.com/rss/search?q=${encodeURIComponent(q + ' news')}&hl=${hl}&gl=${gl}&ceid=${gl}:${hl}`);
      } else if (pageNum === 2) {
        rssUrls.push(`https://news.google.com/rss/search?q=${encodeURIComponent(q + ' today')}&hl=${hl}&gl=${gl}&ceid=${gl}:${hl}`);
      } else if (pageNum === 3) {
        rssUrls.push(`https://news.google.com/rss/search?q=${encodeURIComponent(q + ' update')}&hl=${hl}&gl=${gl}&ceid=${gl}:${hl}`);
      } else if (pageNum === 4) {
        rssUrls.push(`https://news.google.com/rss/search?q=${encodeURIComponent(q + ' breaking')}&hl=${hl}&gl=${gl}&ceid=${gl}:${hl}`);
      } else {
        rssUrls.push(`https://news.google.com/rss/search?q=${encodeURIComponent(q + ' live')}&hl=${hl}&gl=${gl}&ceid=${gl}:${hl}`);
      }
    } else if (category) {
      if (category === 'local') {
        const localCity = localStorage.getItem('weather_city') || 'Hyderabad';
        if (pageNum === 1) {
          rssUrls.push(`https://news.google.com/rss/search?q=${encodeURIComponent(localCity)}&hl=${hl}&gl=${gl}&ceid=${gl}:${hl}`);
          rssUrls.push(`https://news.google.com/rss/search?q=${encodeURIComponent(localCity + ' news')}&hl=${hl}&gl=${gl}&ceid=${gl}:${hl}`);
        } else if (pageNum === 2) {
          rssUrls.push(`https://news.google.com/rss/search?q=${encodeURIComponent(localCity + ' today')}&hl=${hl}&gl=${gl}&ceid=${gl}:${hl}`);
        } else if (pageNum === 3) {
          rssUrls.push(`https://news.google.com/rss/search?q=${encodeURIComponent(localCity + ' updates')}&hl=${hl}&gl=${gl}&ceid=${gl}:${hl}`);
        } else if (pageNum === 4) {
          rssUrls.push(`https://news.google.com/rss/search?q=${encodeURIComponent(localCity + ' live')}&hl=${hl}&gl=${gl}&ceid=${gl}:${hl}`);
        } else {
          rssUrls.push(`https://news.google.com/rss/search?q=${encodeURIComponent(localCity + ' breaking')}&hl=${hl}&gl=${gl}&ceid=${gl}:${hl}`);
        }
      } else {
        const topicMap = {
          technology: 'TECHNOLOGY',
          business: 'BUSINESS',
          sports: 'SPORTS',
          health: 'HEALTH',
          science: 'SCIENCE',
          entertainment: 'ENTERTAINMENT'
        };
        const topic = topicMap[category] || 'WORLD';
        if (pageNum === 1) {
          rssUrls.push(`https://news.google.com/news/rss/headlines/section/topic/${topic}?hl=${hl}&gl=${gl}&ceid=${gl}:${hl}`);
          rssUrls.push(`https://news.google.com/rss/search?q=${encodeURIComponent(category)}&hl=${hl}&gl=${gl}&ceid=${gl}:${hl}`);
        } else if (pageNum === 2) {
          rssUrls.push(`https://news.google.com/rss/search?q=${encodeURIComponent(category + ' news')}&hl=${hl}&gl=${gl}&ceid=${gl}:${hl}`);
        } else if (pageNum === 3) {
          rssUrls.push(`https://news.google.com/rss/search?q=${encodeURIComponent(category + ' update')}&hl=${hl}&gl=${gl}&ceid=${gl}:${hl}`);
        } else if (pageNum === 4) {
          rssUrls.push(`https://news.google.com/rss/search?q=${encodeURIComponent(category + ' breaking')}&hl=${hl}&gl=${gl}&ceid=${gl}:${hl}`);
        } else {
          rssUrls.push(`https://news.google.com/rss/search?q=${encodeURIComponent(category + ' latest')}&hl=${hl}&gl=${gl}&ceid=${gl}:${hl}`);
        }
      }
    } else {
      // General World News
      if (pageNum === 1) {
        rssUrls.push(`https://news.google.com/rss?hl=${hl}&gl=${gl}&ceid=${gl}:${hl}`);
        rssUrls.push(`https://news.google.com/rss/search?q=world+news&hl=${hl}&gl=${gl}&ceid=${gl}:${hl}`);
      } else if (pageNum === 2) {
        rssUrls.push(`https://news.google.com/rss/search?q=breaking+news&hl=${hl}&gl=${gl}&ceid=${gl}:${hl}`);
      } else if (pageNum === 3) {
        rssUrls.push(`https://news.google.com/rss/search?q=global+headlines&hl=${hl}&gl=${gl}&ceid=${gl}:${hl}`);
      } else if (pageNum === 4) {
        rssUrls.push(`https://news.google.com/rss/search?q=international+news&hl=${hl}&gl=${gl}&ceid=${gl}:${hl}`);
      } else {
        rssUrls.push(`https://news.google.com/rss/search?q=current+affairs&hl=${hl}&gl=${gl}&ceid=${gl}:${hl}`);
      }
    }

    let allParsed = [];
    const fetchPromises = rssUrls.map(async (rssUrl) => {
      try {
        const proxyUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`;
        const res = await fetch(proxyUrl);
        if (!res.ok) return;
        const data = await res.json();
        if (data.status !== 'ok' || !data.items) return;

        const items = data.items;
        const segment = items.map(item => {
          const titleText = item.title || '';
          const linkText = item.link || '';
          const pubDateText = item.pubDate || '';
          const sourceText = item.author || 'Google News';
          const descHtml = item.description || '';

          const tempDiv = document.createElement('div');
          tempDiv.innerHTML = descHtml;
          const descText = tempDiv.textContent || tempDiv.innerText || '';

          // Extract original image from item.thumbnail, item.enclosure.link, or description HTML
          let imageUrl = '';
          if (item.thumbnail) {
            imageUrl = item.thumbnail;
          } else if (item.enclosure && item.enclosure.link) {
            imageUrl = item.enclosure.link;
          } else {
            const tempImg = tempDiv.querySelector('img');
            if (tempImg && tempImg.src) {
              imageUrl = tempImg.src;
            }
          }

          // Fallback to deterministic category image database if no original image is found
          if (!imageUrl || imageUrl.includes('favicon') || imageUrl.length < 10) {
            imageUrl = getDeterministicImage(titleText, category);
          }

          let publishedAtIso = new Date().toISOString();
          if (pubDateText) {
            try {
              const parsedDate = new Date(pubDateText.replace(/-/g, '/'));
              if (!isNaN(parsedDate.getTime())) {
                publishedAtIso = parsedDate.toISOString();
              }
            } catch (e) {
              console.warn("Invalid pubDate:", pubDateText);
            }
          }

          return {
            title: titleText,
            description: descText.slice(0, 200) + (descText.length > 200 ? '...' : ''),
            content: descText,
            urlToImage: imageUrl,
            url: linkText,
            source: { name: sourceText },
            publishedAt: publishedAtIso,
            author: sourceText
          };
        });

        allParsed = [...allParsed, ...segment];
      } catch (err) {
        console.warn("Failed individual RSS segment fetch:", err);
      }
    });

    await Promise.all(fetchPromises);

    // De-duplicate by title
    const seen = new Set();
    return allParsed.filter(art => {
      if (!art.title || seen.has(art.title.toLowerCase())) return false;
      seen.add(art.title.toLowerCase());
      return true;
    });
  };

  useEffect(() => {
    const controller = new AbortController()
    async function fetchArticles() {
      try {
        setLoading(true)
        setError(null)

        // 1. Try fetching real-time Google News RSS Feed first
        try {
          const googleNews = await fetchGoogleNewsRSS(query, category, language, page)
          if (googleNews && googleNews.length > 0) {
            if (page === 1) setArticles(googleNews)
            else setArticles(prev => [...prev, ...googleNews])
            // Allow paging on Google RSS up to page 5, then switch to NewsAPI/offline fallback
            setHasMore(page < 5)
            setLoading(false)
            return
          }
        } catch (rssErr) {
          console.warn("Google News RSS failed, falling back to NewsAPI:", rssErr)
        }

        const isTelugu = language === 'te'
        const isTamil = language === 'ta'
        const isKannada = language === 'kn'
        const isMalayalam = language === 'ml'
        const isRegionalIndian = isTelugu || isTamil || isKannada || isMalayalam

        // NewsAPI supports 'hi' natively. Telugu, Tamil, Kannada, Malayalam are regional and unsupported natively, so we request without language filter.
        const langParam = isRegionalIndian ? '' : `&language=${language}`
        
        let domainsParam = ''
        if (isTelugu) {
          domainsParam = '&domains=tupaki.com,oktelugu.com,eenadu.net,sakshi.com,andhrajyothy.com,tv9telugu.com,v6velugu.com,telugu.samayam.com,telugu.oneindia.com'
        } else if (isTamil) {
          domainsParam = '&domains=dinamalar.com,dailythanthi.com,dinakaran.com,vikatan.com,puthiyathalaimurai.com,oneindiatamil.com,tamil.samayam.com'
        } else if (isKannada) {
          domainsParam = '&domains=prajavani.net,kannadaprabha.com,vijayavani.net,uayavani.com,oneindiakannada.com,kannada.samayam.com'
        } else if (isMalayalam) {
          domainsParam = '&domains=mathrubhumi.com,manoramaonline.com,asianetnews.com,deshabhimani.com,madhyamam.com,oneindiamalayalam.com,malayalam.samayam.com'
        }
        
        const dateParam = date ? `&from=${date}&to=${date}` : ''

        // Determine correct endpoint: search queries, date filters, Telugu, Tamil, Kannada, Malayalam, local news, and all non-English languages force '/everything'
        const isLocal = category === 'local'
        const isSearchQuery = (query && query !== 'latest') || isLocal
        const isEnglish = language === 'en'
        const useEverything = !isEnglish || isSearchQuery || date || isLocal

        let url = ''
        if (useEverything) {
          let q = query || 'latest'
          if (isLocal) {
            q = localStorage.getItem('weather_city') || 'Hyderabad'
          } else if (isRegionalIndian || language === 'hi') {
            const keywordMap = {
              te: {
                technology: 'tech OR mobile OR google OR phone OR టెక్నాలజీ',
                business: 'business OR market OR gold OR bank OR వ్యాపారం',
                sports: 'sports OR cricket OR kohli OR match OR క్రీడలు',
                health: 'health OR doctor OR hospital OR heart OR ఆరోగ్యం',
                science: 'science OR space OR isro OR moon OR విజ్ఞానం',
                education: 'education OR school OR university OR exam OR విద్య',
                socialmedia: 'facebook OR twitter OR instagram OR youtube OR tiktok OR సోషల్ మీడియా',
                latest: 'తెలుగు OR ఆంధ్రప్రదేశ్ OR తెలంగాణ'
              },
              hi: {
                technology: 'tech OR mobile OR google OR phone OR प्रौद्योगिकी',
                business: 'business OR market OR gold OR bank OR व्यापार',
                sports: 'sports OR cricket OR kohli OR match OR खेल',
                health: 'health OR doctor OR hospital OR heart OR स्वास्थ्य',
                science: 'science OR space OR isro OR moon OR विज्ञान',
                education: 'education OR school OR university OR exam OR शिक्षा',
                socialmedia: 'facebook OR twitter OR instagram OR youtube OR tiktok OR सोशल मीडिया',
                latest: 'समाचार OR भारत OR हिंदी'
              },
              ta: {
                technology: 'tech OR mobile OR google OR phone OR தொழில்நுட்பம்',
                business: 'business OR market OR gold OR bank OR வணிகம்',
                sports: 'sports OR cricket OR kohli OR match OR விளையாட்டு',
                health: 'health OR doctor OR hospital OR heart OR ஆரோக்கியம்',
                science: 'science OR space OR isro OR moon OR அறிவியல்',
                education: 'education OR school OR university OR exam OR கல்வி',
                socialmedia: 'facebook OR twitter OR instagram OR youtube OR tiktok OR சமூக ஊடகங்கள்',
                latest: 'தமிழ்நாடு OR செய்தி OR சென்னை'
              },
              kn: {
                technology: 'tech OR mobile OR google OR phone OR ತಂತ್ರಜ್ಞಾನ',
                business: 'business OR market OR gold OR bank OR ವ್ಯವಹಾರ',
                sports: 'sports OR cricket OR kohli OR match OR ಕ್ರೀಡೆ',
                health: 'health OR doctor OR hospital OR heart OR ಆರೋಗ್ಯ',
                science: 'science OR space OR isro OR moon OR ವಿಜ್ಞಾನ',
                education: 'education OR school OR university OR exam OR ಶಿಕ್ಷಣ',
                socialmedia: 'facebook OR twitter OR instagram OR youtube OR tiktok OR ಸಾಮಾಜಿಕ ಮಾಧ್ಯಮ',
                latest: 'ಕರ್ನಾಟಕ OR ಸುದ್ದಿ OR ಬೆಂಗಳೂರು'
              },
              ml: {
                technology: 'tech OR mobile OR google OR phone OR സാങ്കേതികവിദ്യ',
                business: 'business OR market OR gold OR bank OR ബിസിനസ്സ്',
                sports: 'sports OR cricket OR kohli OR match OR കായികം',
                health: 'health OR doctor OR hospital OR heart OR ആരോഗ്യം',
                science: 'science OR space OR isro OR moon OR ശാസ്ത്രം',
                education: 'education OR school OR university OR exam OR വിദ്യാഭ്യാസം',
                socialmedia: 'facebook OR twitter OR instagram OR youtube OR tiktok OR സോഷ്യൽ മീഡിയ',
                latest: 'കേരളം OR വാർത്ത OR കൊച്ചി'
              }
            }

            const langKey = language
            if (keywordMap[langKey]) {
              if (category) {
                q = keywordMap[langKey][category] || q
              } else if (q === 'latest') {
                q = keywordMap[langKey]['latest']
              }
            }
          } else {
            // In everything mode, q cannot be empty/latest for good date-filtered results
            if (q === 'latest') {
              q = category === 'socialmedia' ? 'social media' : (category || 'news')
            }
          }
          // Added sortBy=publishedAt to guarantee the latest news comes first on the everything endpoint
          url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(q)}${langParam}${domainsParam}${dateParam}&sortBy=publishedAt&pageSize=${pageSize}&page=${page}&apiKey=${API_KEY}`
        } else {
          const catParam = category ? `&category=${category}` : ''
          url = `https://newsapi.org/v2/top-headlines?language=${language}${catParam}&pageSize=${pageSize}&page=${page}&apiKey=${API_KEY}`
        }

        let resData = null
        if (API_KEY) {
          try {
            const res = await fetch(url, { signal: controller.signal })
            resData = await res.json()
          } catch (fetchErr) {
            if (fetchErr.name === 'AbortError') return
            console.warn("API fetch failed, falling back to mock data:", fetchErr)
          }
        }

        // If API key is missing, rate-limited (status !== 'ok'), or fetch fails, fall back to mock data
        if (!resData || resData.status !== 'ok' || !resData.articles || resData.articles.length === 0) {
          const mockList = getMockArticles(language, category)
          if (page === 1) setArticles(mockList)
          else setArticles(prev => [...prev, ...mockList])
          setHasMore(false)
          setLoading(false)
          return
        }

        const mappedArticles = (resData.articles || []).map(art => ({
          ...art,
          urlToImage: art.urlToImage || getDeterministicImage(art.title, category)
        }))

        if (page === 1) setArticles(mappedArticles)
        else setArticles(prev => [...prev, ...mappedArticles])

        setHasMore((resData.articles?.length ?? 0) >= 1)
        setLoading(false)
      } catch (err) {
        if (err.name === 'AbortError') return
        
        // Final fallback on error
        const mockList = getMockArticles(language, category)
        if (page === 1) setArticles(mockList)
        else setArticles(prev => [...prev, ...mockList])
        setHasMore(false)
        setLoading(false)
      }
    }

    fetchArticles()
    return () => controller.abort()
  }, [query, category, language, page, refreshKey, date, localCityKey])

  return { articles, loading, error, page, setPage, hasMore }
}

