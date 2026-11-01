import React, { useState, useEffect, useRef } from 'react'
import { Search, X, Clock, Trash } from 'lucide-react'

export default function SearchBar({ query, onSearch }) {
  const [q, setQ] = useState(query === 'latest' ? '' : (query || ''))
  const [history, setHistory] = useState(() => {
    try {
      const saved = localStorage.getItem('search_history')
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })
  const [showDropdown, setShowDropdown] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    setQ(query === 'latest' ? '' : (query || ''))
  }, [query])

  useEffect(() => {
    try {
      localStorage.setItem('search_history', JSON.stringify(history))
    } catch (e) {
      console.warn("Storage write blocked:", e)
    }
  }, [history])

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  function submit(e) {
    if (e) e.preventDefault()
    const query = q.trim() || 'latest'
    onSearch(query)
    setShowDropdown(false)

    if (query && query !== 'latest') {
      setHistory(prev => {
        const filtered = prev.filter(item => item !== query)
        return [query, ...filtered].slice(0, 5)
      })
    }
  }

  function handleHistoryItemClick(item) {
    setQ(item)
    onSearch(item)
    setShowDropdown(false)
  }

  function deleteHistoryItem(e, item) {
    e.stopPropagation()
    setHistory(prev => prev.filter(h => h !== item))
  }

  function clearSearch() {
    setQ('')
    onSearch('latest')
  }

  const filteredHistory = history.filter(item => 
    item.toLowerCase().includes(q.toLowerCase())
  )

  return (
    <div className="relative w-full max-w-md" ref={dropdownRef}>
      <form onSubmit={submit} className="relative flex items-center">
        <button type="submit" className="absolute left-3.5 text-slate-400 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors p-0.5 rounded">
          <Search className="w-5 h-5" />
        </button>
        <input 
          value={q} 
          onChange={e => {
            setQ(e.target.value)
            setShowDropdown(true)
          }}
          onFocus={() => setShowDropdown(true)}
          onClick={() => setShowDropdown(true)}
          placeholder="Search news..." 
          className="w-full pl-11 pr-10 py-2.5 rounded-2xl text-sm focus:outline-none glass-input text-slate-800 dark:text-slate-200" 
        />
        {q && (
          <button 
            type="button"
            onClick={clearSearch}
            className="absolute right-3.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors p-0.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </form>

      {/* History Dropdown */}
      {showDropdown && filteredHistory.length > 0 && (
        <div className="absolute top-full mt-2 w-full glass-panel border border-slate-200/50 dark:border-slate-800/50 rounded-2xl shadow-xl overflow-hidden z-20 animate-in fade-in slide-in-from-top-1 duration-200">
          <div className="px-4 py-2 text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider border-b border-slate-100 dark:border-slate-800/50 flex justify-between items-center">
            <span>Recent Searches</span>
            <button 
              onClick={() => setHistory([])}
              className="text-[10px] lowercase text-indigo-500 hover:underline"
            >
              Clear all
            </button>
          </div>
          <ul className="divide-y divide-slate-100 dark:divide-slate-800/50">
            {filteredHistory.map((item) => (
              <li 
                key={item}
                onClick={() => handleHistoryItemClick(item)}
                className="flex items-center justify-between px-4 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer text-sm text-slate-700 dark:text-slate-300 transition-colors group"
              >
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-slate-400" />
                  <span>{item}</span>
                </div>
                <button
                  type="button"
                  onClick={(e) => deleteHistoryItem(e, item)}
                  className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-rose-500 transition-all p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800"
                  title="Remove from history"
                >
                  <Trash className="w-3.5 h-3.5" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}