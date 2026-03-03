'use client';

import type { Conversation } from '@/lib/types';
import { formatRelativeTime } from '@/lib/utils';
import { cn } from '@/lib/utils';
import ChannelBadge from '../shared/ChannelBadge';
import Avatar from '../shared/Avatar';

interface ConversationItemProps {
  conversation: Conversation;
  isActive: boolean;
  onClick: () => void;
}

const priorityBorderColors: Record<string, string> = {
  high: 'border-l-red-500',
  medium: 'border-l-yellow-400',
  low: 'border-l-transparent',
};

export default function ConversationItem({ conversation, isActive, onClick }: ConversationItemProps) {
  const hasUnread = conversation.unreadCount > 0;

  return (
    <button
      onClick={onClick}
      className={cn(
        'w-full text-left flex items-start gap-3 p-3 rounded-lg transition-all border-l-[3px]',
        priorityBorderColors[conversation.priority] || 'border-l-transparent',
        isActive
          ? 'bg-cyan/10 border border-cyan/20 border-l-[3px]'
          : 'hover:bg-white/5 border border-transparent'
      )}
    >
      <div className="relative flex-shrink-0">
        <Avatar name={conversation.contact.name} size="sm" />
        {hasUnread && (
          <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-cyan border-2 border-[#000031]" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <span className={cn('text-sm font-medium truncate', hasUnread ? 'text-white' : 'text-white/80')}>
            {conversation.contact.name}
          </span>
          <span className={cn('text-[10px] flex-shrink-0', hasUnread ? 'text-cyan' : 'text-white/30')}>
            {formatRelativeTime(conversation.lastMessageTime)}
          </span>
        </div>
        <div className="flex items-center gap-1.5 mt-1">
          <ChannelBadge channel={conversation.channel} />
          <span className="text-[10px] text-white/40">· {conversation.agentName}</span>
        </div>
        <p className={cn('text-xs truncate mt-1', hasUnread ? 'text-white/70 font-medium' : 'text-white/50')}>
          {conversation.lastMessage}
        </p>
      </div>
      {conversation.unreadCount > 0 && (
        <span className="flex items-center justify-center min-w-[18px] h-[18px] text-[10px] font-bold rounded-full bg-cyan text-navy flex-shrink-0 mt-1">
          {conversation.unreadCount}
        </span>
      )}
    </button>
  );
}
