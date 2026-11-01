import React, { useEffect } from 'react'
import { CheckCircle2, Trash2, Info, X } from 'lucide-react'

export default function Toast({ toasts, removeToast }) {
  if (toasts.length === 0) return null

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-3 max-w-sm w-full px-4 sm:px-0">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onClose={() => removeToast(toast.id)} />
      ))}
    </div>
  )
}

function ToastItem({ toast, onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, 4000)
    return () => clearTimeout(timer)
  }, [onClose])

  const iconMap = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 animate-bounce" />,
    delete: <Trash2 className="w-5 h-5 text-rose-500 shrink-0 animate-bounce" />,
    info: <Info className="w-5 h-5 text-indigo-500 shrink-0" />
  }

  const borderMap = {
    success: 'border-emerald-500/20 dark:border-emerald-500/30',
    delete: 'border-rose-500/20 dark:border-rose-500/30',
    info: 'border-indigo-500/20 dark:border-indigo-500/30'
  }

  return (
    <div className={`flex items-center gap-3 p-4 rounded-xl shadow-lg border glass-panel transition-all duration-300 transform translate-y-0 scale-100 ${borderMap[toast.type] || borderMap.info}`}>
      {iconMap[toast.type] || iconMap.info}
      
      <div className="flex-1 text-sm font-medium text-slate-800 dark:text-slate-200">
        {toast.message}
      </div>

      <button 
        onClick={onClose} 
        className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors p-0.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  )
}
