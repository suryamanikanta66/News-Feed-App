// src/components/AiChatbot.jsx
import React, { useState, useRef, useEffect } from 'react'
import { Sparkles, Send, X, MessageSquare, Bot, User, Trash2, Settings, Key, HelpCircle } from 'lucide-react'

export default function AiChatbot({ articles = [] }) {
  const [isOpen, setIsOpen] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('gemini_api_key') || '')
  const [tempKey, setTempKey] = useState(apiKey)
  
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      sender: 'bot',
      text: 'Hello! I am your AI News Assistant. Ask me anything to clear your doubts about today\'s articles, or ask general questions!\n\n💡 *Tip: Click the ⚙️ icon in the header to enter a Google Gemini API Key to unlock a fully functional, real-time AI assistant that can answer any question.*',
      timestamp: new Date()
    }
  ])
  const [inputText, setInputText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)

  // Scroll to bottom on new messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, isTyping])

  const generateOfflineResponse = (question) => {
    const query = question.toLowerCase().trim()
    
    // 1. Contextual Match: scan visible articles
    if (articles && articles.length > 0) {
      for (const article of articles) {
        const title = article.title ? article.title.toLowerCase() : ''
        const desc = article.description ? article.description.toLowerCase() : ''
        
        const keywords = ['samsung', 'quantum', 'cancer', 'space', 'solar', 'gold', 'cricket', 'it', 'malaria', 'vaccine', 'fusion', 'nuclear', 'ai', 'intel', 'apple', 'market', 'stock', 'interest rate', 'భารత', 'బంగారం', 'ఐటీ', 'ఇస్రో']
        
        for (const keyword of keywords) {
          if (query.includes(keyword) && (title.includes(keyword) || desc.includes(keyword))) {
            return `[Offline Mode] Based on today's article from ${article.source?.name || 'our feed'}:\n\n"${article.title}"\n\n📝 Details: ${article.description || article.content}\n\n⚠️ *To ask custom follow-up questions, please enter a Google Gemini API Key by clicking the ⚙️ icon in the header.*`
          }
        }
      }
    }

    // 2. Custom doubt clearing lookups
    if (query.includes('interest rate') || query.includes('fed') || query.includes('market') || query.includes('stock')) {
      return "Interest rates represent the cost of borrowing money. When central banks stabilize or pause interest rate hikes, it generally boosts stock markets (like the rally we are seeing today) because borrowing becomes cheaper for businesses, prompting expansion and driving up stock prices."
    }
    if (query.includes('quantum') || query.includes('qubit')) {
      return "Quantum computing operates on quantum mechanics (like superposition and entanglement). Unlike standard computer bits (which are either 0 or 1), quantum qubits can exist in both states simultaneously. This allows them to perform complex calculations in minutes that would take classical computers thousands of years."
    }
    if (query.includes('fusion') || query.includes('nuclear')) {
      return "Nuclear fusion is the reaction that powers the sun. It fuses light hydrogen atoms into helium, releasing massive energy. Unlike fission (used in current nuclear plants), fusion does not produce long-lived radioactive waste and cannot trigger meltdowns, representing the holy grail of clean energy."
    }
    if (query.includes('ai') || query.includes('artificial intelligence') || query.includes('gpt') || query.includes('chatbot')) {
      return "Artificial Intelligence (AI) refers to systems or machines that simulate human cognitive processes to perform tasks and solve problems. I use natural language processing (NLP) to analyze your questions and search current article nodes to answer your doubts instantly!"
    }
    if (query.includes('telugu') || query.includes('ఆంధ్ర') || query.includes('తెలంగాణ') || query.includes('ఉపాధి')) {
      return "నేను మీ తెలుగు సహాయకుడిని! తెలుగు రాష్ట్రాల ఐటీ రంగ విస్తరణ, బంగారం ధరలు, స్పోర్ట్స్ రికార్డులు లేదా ఇతర వార్తల గురించి ఏవైనా సందేహాలుంటే నన్ను అడగండి, నేను క్లియర్ చేస్తాను."
    }
    if (query.includes('hello') || query.includes('hi') || query.includes('hey') || query.includes('hola')) {
      return "Hello there! How can I help you clear your doubts today? Feel free to ask about any article on your feed or general topics!"
    }
    if (query.includes('help') || query.includes('what can you do')) {
      return "I am designed to clear all your doubts! You can ask me to summarize articles from your feed, explain complex terms (like exoplanets, fusion energy, stock rallies), or translate details."
    }

    // 3. Premium generic fallback
    return `You are currently in Offline Mode. I can clear doubts about articles on your feed. Mention key names from the articles (like gold, solar, cancer, Samsung, or space) to get details.\n\n🔑 *To ask any random questions and get real-time full answers from the Gemini 1.5 model, please enter a Google Gemini API Key by clicking the ⚙️ settings icon at the top.*`
  }

  const callGeminiAPI = async (question) => {
    try {
      const feedContext = articles.slice(0, 8).map(a => ({
        title: a.title,
        description: a.description,
        source: a.source?.name,
        publishedAt: a.publishedAt
      }))

      const systemPrompt = `You are a helpful AI News Assistant. Your goal is to help the user clear all their doubts about the news articles or any general questions they ask.
      
      Here are the current articles in the user's news feed:
      ${JSON.stringify(feedContext)}
      
      Answer the user's question accurately. If they ask about an article in the feed, explain it clearly using the provided context. If they ask a general question, answer it in full to clear their doubts.`

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `${systemPrompt}\n\nUser Question: ${question}`
                }
              ]
            }
          ]
        })
      })

      if (!response.ok) {
        const errJson = await response.json().catch(() => ({}))
        throw new Error(errJson.error?.message || `HTTP error ${response.status}`)
      }

      const json = await response.json()
      const text = json.candidates?.[0]?.content?.parts?.[0]?.text
      if (!text) {
        throw new Error("Empty response from AI model")
      }
      return text
    } catch (err) {
      console.error("Gemini API Error:", err)
      return `❌ AI Assistant Error: ${err.message}\n\nPlease check that your Gemini API Key is valid and that you have active internet connection in the ⚙️ settings menu.`
    }
  }

  const handleSend = async (e) => {
    e.preventDefault()
    if (!inputText.trim()) return

    const userMsg = {
      id: Date.now().toString(),
      sender: 'user',
      text: inputText.trim(),
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMsg])
    setInputText('')
    setIsTyping(true)

    // Call real API if key is present, else fall back offline
    if (apiKey.trim()) {
      const responseText = await callGeminiAPI(userMsg.text)
      setMessages(prev => [...prev, {
        id: Date.now().toString() + '-bot',
        sender: 'bot',
        text: responseText,
        timestamp: new Date()
      }])
      setIsTyping(false)
    } else {
      setTimeout(() => {
        const responseText = generateOfflineResponse(userMsg.text)
        setMessages(prev => [...prev, {
          id: Date.now().toString() + '-bot',
          sender: 'bot',
          text: responseText,
          timestamp: new Date()
        }])
        setIsTyping(false)
      }, 1000)
    }
  }

  const saveSettings = (e) => {
    e.preventDefault()
    localStorage.setItem('gemini_api_key', tempKey.trim())
    setApiKey(tempKey.trim())
    setShowSettings(false)
    
    setMessages(prev => [...prev, {
      id: Date.now().toString() + '-system',
      sender: 'bot',
      text: tempKey.trim() 
        ? '✅ Gemini API Key saved successfully! I am now connected to the live Gemini 1.5 Flash model. Ask me any question!' 
        : 'ℹ️ API Key cleared. Operating in offline demo mode.',
      timestamp: new Date()
    }])
  }

  const clearChat = () => {
    setMessages([
      {
        id: 'welcome',
        sender: 'bot',
        text: 'Chat history cleared. Ask me anything to clear your doubts!',
        timestamp: new Date()
      }
    ])
  }

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      
      {/* Chat window Popover */}
      {isOpen && (
        <div className="w-[330px] sm:w-[380px] h-[480px] mb-4 rounded-2xl glass-panel shadow-2xl border border-slate-200/50 dark:border-slate-800/50 flex flex-col overflow-hidden animate-in slide-in-from-bottom-6 duration-300">
          
          {/* Header */}
          <div className="px-4 py-3 bg-gradient-to-r from-indigo-600 to-violet-600 text-white flex justify-between items-center shrink-0">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 animate-pulse" />
              <div>
                <h3 className="font-bold text-sm">AI Doubt Clearer</h3>
                <p className="text-[10px] opacity-85">
                  {apiKey.trim() ? '🤖 Live Gemini 1.5 Enabled' : '🔌 Demo Mode'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setShowSettings(!showSettings)}
                className={`p-1 rounded-lg transition-colors ${showSettings ? 'bg-white/20 text-white' : 'text-white/80 hover:text-white'}`}
                title="AI Settings"
              >
                <Settings className="w-4.5 h-4.5" />
              </button>
              <button 
                onClick={clearChat}
                className="p-1 rounded-lg hover:bg-white/10 transition-colors text-white/80 hover:text-white"
                title="Clear Chat History"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-lg hover:bg-white/10 transition-colors"
              >
                <X className="w-4.5 h-4.5" />
              </button>
            </div>
          </div>

          {/* Settings panel overlay inside Popover */}
          {showSettings ? (
            <div className="flex-1 p-4 bg-slate-50 dark:bg-slate-900 flex flex-col justify-between overflow-y-auto">
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2 font-bold text-slate-800 dark:text-white text-sm">
                  <Key className="w-4 h-4 text-indigo-500" />
                  <span>Configure Live Gemini AI</span>
                </div>
                
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Enter a Google Gemini API Key to enable unlimited real-time responses to custom questions. The key is saved securely in your browser's local storage.
                </p>

                <form onSubmit={saveSettings} className="flex flex-col gap-3">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">
                      Gemini API Key
                    </label>
                    <input
                      type="password"
                      placeholder="AIzaSy..."
                      value={tempKey}
                      onChange={(e) => setTempKey(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl text-xs focus:outline-none glass-input text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-800"
                    />
                  </div>
                  
                  <div className="flex gap-2 justify-end mt-2">
                    <button
                      type="button"
                      onClick={() => {
                        setTempKey('')
                        localStorage.removeItem('gemini_api_key')
                        setApiKey('')
                        setShowSettings(false)
                        addToast && addToast('Gemini API key removed', 'info')
                      }}
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/20 transition-colors"
                    >
                      Clear Key
                    </button>
                    <button
                      type="submit"
                      className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-1.5 rounded-lg text-xs font-semibold shadow-md transition-colors"
                    >
                      Save & Apply
                    </button>
                  </div>
                </form>
              </div>

              <div className="p-3 rounded-xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-100/40 dark:border-indigo-900/30 flex gap-2.5 items-start">
                <HelpCircle className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                <div className="text-[11px] text-indigo-900 dark:text-indigo-300 leading-relaxed">
                  Don't have a key? You can get a free one in 1 minute from 
                  <a 
                    href="https://aistudio.google.com/" 
                    target="_blank" 
                    rel="noreferrer"
                    className="underline font-bold ml-1 hover:text-indigo-600 dark:hover:text-indigo-400"
                  >
                    Google AI Studio
                  </a>.
                </div>
              </div>
            </div>
          ) : (
            <>
              {/* Messages Area */}
              <div className="flex-1 p-4 overflow-y-auto bg-slate-50/50 dark:bg-slate-900/10 flex flex-col gap-3 scrollbar-none">
                {messages.map((msg) => (
                  <div 
                    key={msg.id} 
                    className={`flex gap-2 max-w-[85%] ${msg.sender === 'user' ? 'self-end flex-row-reverse' : 'self-start'}`}
                  >
                    {/* Avatar */}
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-sm ${msg.sender === 'user' ? 'bg-indigo-600 text-white' : 'bg-white dark:bg-slate-800 text-indigo-500 border border-slate-200/50 dark:border-slate-800/50'}`}>
                      {msg.sender === 'user' ? <User className="w-4.5 h-4.5" /> : <Bot className="w-4.5 h-4.5" />}
                    </div>

                    {/* Message Body */}
                    <div className={`p-3 rounded-2xl text-xs leading-relaxed ${msg.sender === 'user' ? 'bg-indigo-600 text-white rounded-tr-none' : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200/30 dark:border-slate-800/40 rounded-tl-none shadow-sm'}`}>
                      <p className="whitespace-pre-line">{msg.text}</p>
                    </div>
                  </div>
                ))}

                {/* Typing indicator */}
                {isTyping && (
                  <div className="flex gap-2 max-w-[85%] self-start items-center">
                    <div className="w-8 h-8 rounded-full bg-white dark:bg-slate-800 text-indigo-500 border border-slate-200/50 dark:border-slate-800/50 flex items-center justify-center shrink-0">
                      <Bot className="w-4.5 h-4.5" />
                    </div>
                    <div className="px-4 py-3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/30 dark:border-slate-800/40 rounded-tl-none shadow-sm flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce duration-1000"></span>
                      <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce duration-1000 delay-150"></span>
                      <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce duration-1000 delay-300"></span>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Form Footer */}
              <form onSubmit={handleSend} className="p-3 border-t border-slate-200/40 dark:border-slate-800/40 glass-panel flex gap-2 items-center shrink-0">
                <input
                  type="text"
                  placeholder="Ask a question..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  className="flex-1 px-3 py-2 rounded-xl text-xs focus:outline-none glass-input text-slate-800 dark:text-slate-200"
                />
                <button
                  type="submit"
                  disabled={!inputText.trim() || isTyping}
                  className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white p-2.5 rounded-xl flex items-center justify-center transition-colors shadow-md transform active:scale-95"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </>
          )}

        </div>
      )}

      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white rounded-full flex items-center justify-center shadow-lg shadow-indigo-200 dark:shadow-none hover:scale-110 active:scale-95 transition-all duration-300"
        title="Ask AI Doubt Clearer"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6 animate-bounce" />}
      </button>

    </div>
  )
}
