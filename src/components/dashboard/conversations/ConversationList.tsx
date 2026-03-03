'use client';

import { useState } from 'react';
import type { Conversation } from '@/lib/types';
import SearchBar from '../shared/SearchBar';
import ConversationItem from './ConversationItem';

interface ConversationListProps {
  conversations: Conversation[];
  activeId: string | null;
  onSelect: (conversation: Conversation) => void;
}

export default function ConversationList({ conversations, activeId, onSelect }: ConversationListProps) {
  const [search, setSearch] = useState('');

  const filtered = conversations.filter((c) =>
    c.contact.name.toLowerCase().includes(search.toLowerCase()) ||
    c.lastMessage.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full">
      <div className="p-3 border-b border-white/10">
        <SearchBar
          placeholder="Buscar conversaciones..."
          value={search}
          onChange={setSearch}
        />
      </div>
      <div className="flex-1 overflow-y-auto p-2 space-y-0.5">
        {filtered.map((conv) => (
          <ConversationItem
            key={conv.id}
            conversation={conv}
            isActive={activeId === conv.id}
            onClick={() => onSelect(conv)}
          />
        ))}
      </div>
    </div>
  );
}
