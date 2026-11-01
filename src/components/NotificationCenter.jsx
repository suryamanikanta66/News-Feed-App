import React, { useState, useEffect, useRef } from 'react'
import { Bell, MapPin, Heart, Bookmark, AlertCircle, Trash2, Check, CheckCheck } from 'lucide-react'

export default function NotificationCenter({ notifications, onMarkAsRead, onMarkAllAsRead, onClearAll }) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  const unreadCount = notifications.filter(n => !n.read).length

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const getIcon = (type) => {
    switch (type) {
      case 'location':
        return <MapPin className="w-4 h-4 text-sky-500 shrink-0" />
      case 'like':
        return <Heart className="w-4 h-4 text-rose-500 fill-current shrink-0" />
      case 'bookmark':
        return <Bookmark className="w-4 h-4 text-indigo-500 fill-current shrink-0" />
      case 'bulletin':
        return <AlertCircle className="w-4 h-4 text-amber-500 shrink-0 animate-pulse" />
      default:
        return <Bell className="w-4 h-4 text-slate-400 shrink-0" />
    }
  }

  const formatTime = (isoString) => {
    try {
      const diffMs = Date.now() - new Date(isoString).getTime()
      const diffSecs = Math.floor(diffMs / 1000)
      if (diffSecs < 60) return 'Just now'
      const diffMins = Math.floor(diffSecs / 60)
      if (diffMins < 60) return `${diffMins}m ago`
      const diffHours = Math.floor(diffMins / 60)
      if (diffHours < 24) return `${diffHours}h ago`
      return new Date(isoString).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
    } catch {
      return ''
    }
  }

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Bell Button Trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2.5 rounded-xl bg-slate-100/50 hover:bg-slate-100 dark:bg-slate-900/50 dark:hover:bg-slate-900 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 transition-all border border-slate-200/40 dark:border-slate-800/40 relative shadow-sm"
        title="Notifications"
      >
        <Bell className={`w-4 h-4 ${unreadCount > 0 ? 'animate-bounce' : ''}`} />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[9px] font-extrabold text-white animate-in scale-in duration-200">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Notifications Panel Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-3.5 w-80 md:w-96 glass-panel border border-slate-200/50 dark:border-slate-800/50 rounded-2xl shadow-xl overflow-hidden z-30 animate-in fade-in slide-in-from-top-2 duration-200">
          
          {/* Header */}
          <div className="px-4 py-3 bg-slate-50/50 dark:bg-slate-900/50 border-b border-slate-200/40 dark:border-slate-800/40 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm text-slate-800 dark:text-white">Notifications</span>
              {unreadCount > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 text-[10px] font-bold">
                  {unreadCount} new
                </span>
              )}
            </div>
            
            <div className="flex items-center gap-3">
              {unreadCount > 0 && (
                <button
                  onClick={onMarkAllAsRead}
                  className="text-xs text-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center gap-1 font-semibold transition-colors"
                  title="Mark all as read"
                >
                  <CheckCheck className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Mark read</span>
                </button>
              )}
              {notifications.length > 0 && (
                <button
                  onClick={onClearAll}
                  className="text-xs text-slate-400 hover:text-rose-500 dark:hover:text-rose-400 flex items-center gap-1 font-semibold transition-colors"
                  title="Clear all"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Clear</span>
                </button>
              )}
            </div>
          </div>

          {/* List Content */}
          <div className="max-h-80 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800/50">
            {notifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
                <Bell className="w-8 h-8 text-slate-300 dark:text-slate-700 mb-2.5" />
                <span className="text-xs font-semibold text-slate-400 dark:text-slate-500">No notifications yet</span>
                <span className="text-[10px] text-slate-400/70 dark:text-slate-600 mt-1">Updates about weather, likes, and breaking news will appear here.</span>
              </div>
            ) : (
              notifications.map((notif) => (
                <div
                  key={notif.id}
                  onClick={() => onMarkAsRead(notif.id)}
                  className={`flex gap-3 px-4 py-3 cursor-pointer hover:bg-slate-50/70 dark:hover:bg-slate-800/20 transition-colors relative group ${!notif.read ? 'bg-indigo-50/20 dark:bg-indigo-950/5' : ''}`}
                >
                  {/* Left Icon */}
                  <div className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/30 dark:border-slate-800/40 h-8 w-8 flex items-center justify-center shadow-sm shrink-0">
                    {getIcon(notif.type)}
                  </div>
                  
                  {/* Text Details */}
                  <div className="flex-1 min-w-0 flex flex-col gap-0.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className={`text-xs font-bold truncate ${!notif.read ? 'text-slate-950 dark:text-white' : 'text-slate-500 dark:text-slate-400'}`}>
                        {notif.title}
                      </span>
                      <span className="text-[9px] text-slate-400 dark:text-slate-500 shrink-0">
                        {formatTime(notif.timestamp)}
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 leading-normal line-clamp-2">
                      {notif.description}
                    </span>
                  </div>

                  {/* Unread indicator dot */}
                  {!notif.read && (
                    <span className="absolute right-3.5 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-indigo-600 dark:bg-indigo-400" />
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  )
}
