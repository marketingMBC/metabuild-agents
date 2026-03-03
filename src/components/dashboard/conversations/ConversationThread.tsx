'use client';

import type { Conversation } from '@/lib/types';
import { internalNotes } from '@/lib/mock-data';
import { formatTime } from '@/lib/utils';
import MessageBubble from './MessageBubble';
import MessageInput from './MessageInput';
import InternalNoteBubble from './InternalNoteBubble';
import OmnichannelIndicator from './OmnichannelIndicator';
import ConversationActions from './ConversationActions';
import StatusBadge from '../shared/StatusBadge';
import Avatar from '../shared/Avatar';

interface ConversationThreadProps {
  conversation: Conversation;
}

export default function ConversationThread({ conversation }: ConversationThreadProps) {
  const notes = internalNotes.filter((n) => n.conversationId === conversation.id);

  const handleSend = (message: string, isNote: boolean) => {
    // In a real app this would dispatch to the store / API
    console.log(isNote ? '[Internal Note]' : '[Message]', message);
  };

  const handleAction = (action: string) => {
    console.log('Action:', action);
  };

  // Merge messages and notes into a single timeline sorted by timestamp
  type TimelineItem =
    | { kind: 'message'; data: (typeof conversation.messages)[number] }
    | { kind: 'note'; data: (typeof notes)[number] };

  const timeline: TimelineItem[] = [
    ...conversation.messages.map((m) => ({ kind: 'message' as const, data: m })),
    ...notes.map((n) => ({ kind: 'note' as const, data: n })),
  ].sort((a, b) => new Date(a.data.timestamp).getTime() - new Date(b.data.timestamp).getTime());

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
        <div className="flex items-center gap-3">
          <Avatar name={conversation.contact.name} size="sm" />
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-white">{conversation.contact.name}</span>
              <StatusBadge status={conversation.status} />
            </div>
            <div className="flex items-center gap-2 mt-0.5">
              <OmnichannelIndicator channel={conversation.channel} showLabel />
              <span className="text-[11px] text-white/40">Agente: {conversation.agentName}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-1">
            {conversation.tags.map((tag) => (
              <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-white/40">
                {tag}
              </span>
            ))}
          </div>
          <ConversationActions onAction={handleAction} />
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        {timeline.map((item) =>
          item.kind === 'message' ? (
            <MessageBubble key={item.data.id} message={item.data} />
          ) : (
            <InternalNoteBubble
              key={item.data.id}
              authorName={item.data.authorName}
              content={item.data.content}
              timestamp={formatTime(item.data.timestamp)}
            />
          )
        )}
      </div>

      {/* Input */}
      <MessageInput onSend={handleSend} />
    </div>
  );
}
