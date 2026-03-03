import { apiGet, apiPost } from './api';
import { conversations as mockConversations } from '@/lib/mock-data';
import type { Conversation, Message, ConversationStatus } from '@/lib/types';

export const conversationsService = {
  getAll: () => apiGet(mockConversations),
  getById: (id: string) => apiGet(mockConversations.find((c) => c.id === id) || null),
  sendMessage: (conversationId: string, message: Message) => apiPost(message),
  updateStatus: (id: string, status: ConversationStatus) => {
    const conv = mockConversations.find((c) => c.id === id);
    return apiPost(conv ? { ...conv, status } : null);
  },
};
