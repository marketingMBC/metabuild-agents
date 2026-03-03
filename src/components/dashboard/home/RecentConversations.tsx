'use client';

import Link from 'next/link';
import { conversations } from '@/lib/mock-data';
import { formatRelativeTime } from '@/lib/utils';
import ChannelBadge from '../shared/ChannelBadge';
import Avatar from '../shared/Avatar';

export default function RecentConversations() {
  const recent = conversations
    .sort((a, b) => new Date(b.lastMessageTime).getTime() - new Date(a.lastMessageTime).getTime())
    .slice(0, 6);

  return (
    <div className="rounded-xl border border-white/10 bg-surface p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-white">Conversaciones recientes</h3>
        <Link href="/dashboard/conversations" className="text-xs text-cyan hover:text-cyan-light transition-colors">
          Ver todas
        </Link>
      </div>

      <div className="space-y-1">
        {recent.map((conv) => (
          <div
            key={conv.id}
            className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
          >
            <Avatar name={conv.contact.name} size="sm" />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-white truncate">{conv.contact.name}</span>
                <ChannelBadge channel={conv.channel} />
              </div>
              <p className="text-xs text-white/40 truncate mt-0.5">{conv.lastMessage}</p>
            </div>
            <div className="flex flex-col items-end gap-1 flex-shrink-0">
              <span className="text-[10px] text-white/30">{formatRelativeTime(conv.lastMessageTime)}</span>
              {conv.unreadCount > 0 && (
                <span className="flex items-center justify-center min-w-[18px] h-[18px] text-[10px] font-bold rounded-full bg-cyan text-navy">
                  {conv.unreadCount}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
