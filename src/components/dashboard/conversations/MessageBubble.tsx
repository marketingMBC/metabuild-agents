'use client';

import { useState } from 'react';
import type { Message } from '@/lib/types';
import { formatTime, getChannelColor, getChannelLabel } from '@/lib/utils';
import { cn } from '@/lib/utils';

interface MessageBubbleProps {
  message: Message;
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  const [hovered, setHovered] = useState(false);
  const isUser = message.sender === 'user';
  const isSystem = message.sender === 'system';
  const channelColor = getChannelColor(message.channel);

  if (isSystem) {
    return (
      <div className="flex justify-center my-2">
        <span className="text-[11px] text-white/30 bg-white/5 px-3 py-1 rounded-full">
          {message.content}
        </span>
      </div>
    );
  }

  return (
    <div
      className={cn('flex mb-3 group', isUser ? 'justify-end' : 'justify-start')}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className={cn('max-w-[75%]')}>
        <div
          className={cn(
            'px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed',
            isUser
              ? 'bg-white/10 text-white bubble-user'
              : 'bubble-agent'
          )}
          style={!isUser ? {
            backgroundColor: `${channelColor}12`,
            borderLeft: `3px solid ${channelColor}40`,
          } : undefined}
        >
          {!isUser && (
            <div className="flex items-center gap-2 mb-1">
              <p className="text-[10px] font-semibold" style={{ color: channelColor }}>
                {message.senderName}
              </p>
              <span
                className="text-[9px] px-1.5 py-0.5 rounded-full font-medium"
                style={{
                  backgroundColor: `${channelColor}18`,
                  color: channelColor,
                }}
              >
                {getChannelLabel(message.channel)}
              </span>
            </div>
          )}
          <p className={isUser ? 'text-white/90' : 'text-white/80'}>{message.content}</p>
        </div>
        <p className={cn(
          'text-[10px] mt-1 px-1 transition-opacity duration-200',
          isUser ? 'text-right' : 'text-left',
          hovered ? 'text-white/40 opacity-100' : 'text-white/25 opacity-0'
        )}>
          {formatTime(message.timestamp)}
        </p>
      </div>
    </div>
  );
}
