import { apiGet, apiPost, apiPut, apiDelete } from './api';
import { knowledgeDocuments as mockDocs, faqs as mockFaqs } from '@/lib/mock-data';
import type { KnowledgeDocument, FAQ } from '@/lib/types';

export const knowledgeService = {
  getDocuments: () => apiGet(mockDocs),
  getFaqs: () => apiGet(mockFaqs),
  uploadDocument: (doc: KnowledgeDocument) => apiPost(doc),
  deleteDocument: (id: string) => apiDelete(),
  createFaq: (faq: FAQ) => apiPost(faq),
  updateFaq: (id: string, updates: Partial<FAQ>) => {
    const faq = mockFaqs.find((f) => f.id === id);
    return apiPut(faq ? { ...faq, ...updates } : null);
  },
  deleteFaq: (id: string) => apiDelete(),
};
