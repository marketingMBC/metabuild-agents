import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import type { Conversation, ConversationStatus, Channel, Message } from '@/lib/types';

interface ConversationsState {
  conversations: Conversation[];
  selectedConversationId: string | null;
  filterChannel: Channel | 'all';
  filterStatus: ConversationStatus | 'all';
  filterAgentId: string | 'all';
  filterPriority: 'low' | 'medium' | 'high' | 'all';
  searchQuery: string;
  loading: boolean;
  error: string | null;

  // Actions
  setConversations: (conversations: Conversation[]) => void;
  selectConversation: (id: string | null) => void;
  setFilterChannel: (channel: Channel | 'all') => void;
  setFilterStatus: (status: ConversationStatus | 'all') => void;
  setFilterAgentId: (agentId: string | 'all') => void;
  setFilterPriority: (priority: 'low' | 'medium' | 'high' | 'all') => void;
  setSearchQuery: (query: string) => void;
  addMessage: (conversationId: string, message: Message) => void;
  updateConversationStatus: (id: string, status: ConversationStatus) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;

  // Computed
  filteredConversations: () => Conversation[];
  selectedConversation: () => Conversation | undefined;
}

export const useConversationsStore = create<ConversationsState>()(
  immer((set, get) => ({
    conversations: [],
    selectedConversationId: null,
    filterChannel: 'all',
    filterStatus: 'all',
    filterAgentId: 'all',
    filterPriority: 'all',
    searchQuery: '',
    loading: false,
    error: null,

    setConversations: (conversations) => set((state) => { state.conversations = conversations; }),
    selectConversation: (id) => set((state) => { state.selectedConversationId = id; }),
    setFilterChannel: (channel) => set((state) => { state.filterChannel = channel; }),
    setFilterStatus: (status) => set((state) => { state.filterStatus = status; }),
    setFilterAgentId: (agentId) => set((state) => { state.filterAgentId = agentId; }),
    setFilterPriority: (priority) => set((state) => { state.filterPriority = priority; }),
    setSearchQuery: (query) => set((state) => { state.searchQuery = query; }),
    addMessage: (conversationId, message) =>
      set((state) => {
        const conv = state.conversations.find((c) => c.id === conversationId);
        if (conv) {
          conv.messages.push(message);
          conv.lastMessage = message.content;
          conv.lastMessageTime = message.timestamp;
        }
      }),
    updateConversationStatus: (id, status) =>
      set((state) => {
        const conv = state.conversations.find((c) => c.id === id);
        if (conv) conv.status = status;
      }),
    setLoading: (loading) => set((state) => { state.loading = loading; }),
    setError: (error) => set((state) => { state.error = error; }),

    filteredConversations: () => {
      const state = get();
      return state.conversations.filter((c) => {
        if (state.filterChannel !== 'all' && c.channel !== state.filterChannel) return false;
        if (state.filterStatus !== 'all' && c.status !== state.filterStatus) return false;
        if (state.filterAgentId !== 'all' && c.agentId !== state.filterAgentId) return false;
        if (state.filterPriority !== 'all' && c.priority !== state.filterPriority) return false;
        if (state.searchQuery) {
          const q = state.searchQuery.toLowerCase();
          return c.contact.name.toLowerCase().includes(q) ||
            c.lastMessage.toLowerCase().includes(q) ||
            c.tags.some((t) => t.toLowerCase().includes(q));
        }
        return true;
      });
    },
    selectedConversation: () => {
      const state = get();
      return state.conversations.find((c) => c.id === state.selectedConversationId);
    },
  }))
);
