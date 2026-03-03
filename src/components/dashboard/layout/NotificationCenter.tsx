'use client';

import { useState, useRef, useEffect } from 'react';
import { Bell, CheckCheck, X } from 'lucide-react';
import { useAppStore } from '@/stores/app-store';
import { cn } from '@/lib/utils';
import { formatRelativeTime } from '@/lib/utils';
import Link from 'next/link';

const typeStyles = {
  info: 'bg-blue-500/20 text-blue-400',
  success: 'bg-green-500/20 text-green-400',
  warning: 'bg-yellow-500/20 text-yellow-400',
  error: 'bg-red-500/20 text-red-400',
};

export default function NotificationCenter() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const notifications = useAppStore((s) => s.notifications);
  const unreadCount = useAppStore((s) => s.unreadNotificationsCount);
  const markNotificationRead = useAppStore((s) => s.markNotificationRead);
  const markAllNotificationsRead = useAppStore((s) => s.markAllNotificationsRead);
  const removeNotification = useAppStore((s) => s.removeNotification);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="relative p-2 text-white/60 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
      >
        <Bell size={18} />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-cyan rounded-full animate-pulse" />
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-80 rounded-xl border border-white/10 bg-surface shadow-2xl z-50 animate-slide-up overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
            <h3 className="text-sm font-semibold text-white">Notificaciones</h3>
            {unreadCount > 0 && (
              <button
                onClick={markAllNotificationsRead}
                className="flex items-center gap-1 text-[11px] text-cyan hover:text-cyan-light transition-colors"
              >
                <CheckCheck size={12} />
                Marcar todas
              </button>
            )}
          </div>

          <div className="max-h-80 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="py-8 text-center">
                <Bell size={24} className="mx-auto text-white/20 mb-2" />
                <p className="text-sm text-white/40">Sin notificaciones</p>
              </div>
            ) : (
              notifications.map((notif) => (
                <div
                  key={notif.id}
                  className={cn(
                    'flex items-start gap-3 px-4 py-3 border-b border-white/5 hover:bg-white/5 transition-colors',
                    !notif.read && 'bg-white/[0.03]'
                  )}
                >
                  <div className={cn('w-2 h-2 rounded-full mt-1.5 flex-shrink-0', notif.read ? 'bg-transparent' : 'bg-cyan')} />
                  <div className="flex-1 min-w-0">
                    {notif.link ? (
                      <Link
                        href={notif.link}
                        onClick={() => {
                          markNotificationRead(notif.id);
                          setOpen(false);
                        }}
                        className="block"
                      >
                        <p className="text-sm font-medium text-white truncate">{notif.title}</p>
                        <p className="text-xs text-white/50 mt-0.5 line-clamp-2">{notif.message}</p>
                        <p className="text-[10px] text-white/30 mt-1">{formatRelativeTime(notif.timestamp)}</p>
                      </Link>
                    ) : (
                      <>
                        <p className="text-sm font-medium text-white truncate">{notif.title}</p>
                        <p className="text-xs text-white/50 mt-0.5 line-clamp-2">{notif.message}</p>
                        <p className="text-[10px] text-white/30 mt-1">{formatRelativeTime(notif.timestamp)}</p>
                      </>
                    )}
                  </div>
                  <button
                    onClick={() => removeNotification(notif.id)}
                    className="flex-shrink-0 p-0.5 text-white/20 hover:text-white/60 transition-colors"
                  >
                    <X size={12} />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
