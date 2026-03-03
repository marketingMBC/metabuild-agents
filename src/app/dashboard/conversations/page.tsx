'use client';

import { useEffect, useState } from 'react';
import { conversations as allConversations, agents } from '@/lib/mock-data';
import { useConversationsStore } from '@/stores/conversations-store';
import type { Conversation } from '@/lib/types';
import ConversationList from '@/components/dashboard/conversations/ConversationList';
import ConversationThread from '@/components/dashboard/conversations/ConversationThread';
import ConversationFilters from '@/components/dashboard/conversations/ConversationFilters';
import ContactInfoSidebar from '@/components/dashboard/conversations/ContactInfoSidebar';
import EmptyState from '@/components/dashboard/shared/EmptyState';
import { MessageSquare, ArrowLeft, Filter } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function ConversationsPage() {
  const {
    conversations,
    setConversations,
    selectedConversationId,
    selectConversation,
    filterChannel,
    filterStatus,
    filterAgentId,
    filterPriority,
    setFilterChannel,
    setFilterStatus,
    setFilterAgentId,
    setFilterPriority,
    filteredConversations,
    selectedConversation,
  } = useConversationsStore();

  const [mobileView, setMobileView] = useState<'list' | 'thread'>('list');
  const [showFilters, setShowFilters] = useState(false);

  // Load conversations into store on mount
  useEffect(() => {
    if (conversations.length === 0) {
      setConversations(allConversations);
    }
  }, [conversations.length, setConversations]);

  const filtered = filteredConversations().sort(
    (a, b) => new Date(b.lastMessageTime).getTime() - new Date(a.lastMessageTime).getTime()
  );

  const selected = selectedConversation();

  const handleSelect = (conv: Conversation) => {
    selectConversation(conv.id);
    setMobileView('thread');
  };

  const handleBack = () => {
    selectConversation(null);
    setMobileView('list');
  };

  // Agent filter options
  const agentOptions = [
    { label: 'Todos', value: 'all' },
    ...agents.map((a) => ({ label: a.name, value: a.id })),
  ];

  // Priority filter options
  const priorityOptions = [
    { label: 'Todas', value: 'all' },
    { label: 'Alta', value: 'high' },
    { label: 'Media', value: 'medium' },
    { label: 'Baja', value: 'low' },
  ];

  return (
    <div className="h-[calc(100vh-7rem)]">
      <div className="flex h-full rounded-xl border border-white/10 overflow-hidden bg-surface">
        {/* Left: List */}
        <div
          className={cn(
            'w-full md:w-80 flex-shrink-0 border-r border-white/10 flex flex-col',
            mobileView === 'thread' ? 'hidden md:flex' : 'flex'
          )}
        >
          <ConversationFilters
            channelFilter={filterChannel}
            statusFilter={filterStatus}
            onChannelChange={(v) => setFilterChannel(v as typeof filterChannel)}
            onStatusChange={(v) => setFilterStatus(v as typeof filterStatus)}
          />

          {/* Agent & Priority filters */}
          <div className="px-3 pb-2 border-b border-white/10">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-1.5 text-[11px] text-white/40 hover:text-white transition-colors"
            >
              <Filter size={12} />
              {showFilters ? 'Ocultar filtros' : 'Más filtros'}
              {(filterAgentId !== 'all' || filterPriority !== 'all') && (
                <span className="w-1.5 h-1.5 rounded-full bg-cyan" />
              )}
            </button>
            {showFilters && (
              <div className="mt-2 space-y-2">
                <div>
                  <label className="text-[10px] text-white/30 uppercase tracking-wider mb-1 block">Agente</label>
                  <select
                    value={filterAgentId}
                    onChange={(e) => setFilterAgentId(e.target.value as typeof filterAgentId)}
                    className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-2 py-1.5 text-xs text-white outline-none focus:border-cyan/40"
                  >
                    {agentOptions.map((opt) => (
                      <option key={opt.value} value={opt.value} className="bg-[#000031]">
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-[10px] text-white/30 uppercase tracking-wider mb-1 block">Prioridad</label>
                  <select
                    value={filterPriority}
                    onChange={(e) => setFilterPriority(e.target.value as typeof filterPriority)}
                    className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-2 py-1.5 text-xs text-white outline-none focus:border-cyan/40"
                  >
                    {priorityOptions.map((opt) => (
                      <option key={opt.value} value={opt.value} className="bg-[#000031]">
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}
          </div>

          <div className="flex-1 overflow-hidden">
            <ConversationList
              conversations={filtered}
              activeId={selectedConversationId}
              onSelect={handleSelect}
            />
          </div>
        </div>

        {/* Center: Thread */}
        <div
          className={cn(
            'flex-1 flex flex-col min-w-0',
            mobileView === 'list' ? 'hidden md:flex' : 'flex'
          )}
        >
          {/* Mobile back button */}
          {mobileView === 'thread' && (
            <button
              onClick={handleBack}
              className="md:hidden flex items-center gap-2 px-4 py-2 text-sm text-white/60 hover:text-white border-b border-white/10 transition-colors"
            >
              <ArrowLeft size={16} />
              Volver a conversaciones
            </button>
          )}

          {selected ? (
            <ConversationThread conversation={selected} />
          ) : (
            <EmptyState
              icon={<MessageSquare size={32} className="text-white/30" />}
              title="Selecciona una conversación"
              description="Elige una conversación de la lista para ver los mensajes"
            />
          )}
        </div>

        {/* Right: Contact Info */}
        {selected && (
          <div className="w-72 flex-shrink-0 border-l border-white/10 hidden xl:block">
            <ContactInfoSidebar contact={selected.contact} />
          </div>
        )}
      </div>
    </div>
  );
}
