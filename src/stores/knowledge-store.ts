import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import type { KnowledgeDocument, FAQ } from '@/lib/types';

interface KnowledgeState {
  documents: KnowledgeDocument[];
  faqs: FAQ[];
  activeTab: 'documents' | 'faqs' | 'urls';
  searchQuery: string;
  loading: boolean;
  error: string | null;

  setDocuments: (docs: KnowledgeDocument[]) => void;
  setFaqs: (faqs: FAQ[]) => void;
  setActiveTab: (tab: 'documents' | 'faqs' | 'urls') => void;
  setSearchQuery: (query: string) => void;
  addDocument: (doc: KnowledgeDocument) => void;
  removeDocument: (id: string) => void;
  addFaq: (faq: FAQ) => void;
  updateFaq: (id: string, updates: Partial<FAQ>) => void;
  removeFaq: (id: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useKnowledgeStore = create<KnowledgeState>()(
  immer((set) => ({
    documents: [],
    faqs: [],
    activeTab: 'documents',
    searchQuery: '',
    loading: false,
    error: null,

    setDocuments: (docs) => set((state) => { state.documents = docs; }),
    setFaqs: (faqs) => set((state) => { state.faqs = faqs; }),
    setActiveTab: (tab) => set((state) => { state.activeTab = tab; }),
    setSearchQuery: (query) => set((state) => { state.searchQuery = query; }),
    addDocument: (doc) => set((state) => { state.documents.push(doc); }),
    removeDocument: (id) =>
      set((state) => { state.documents = state.documents.filter((d) => d.id !== id); }),
    addFaq: (faq) => set((state) => { state.faqs.push(faq); }),
    updateFaq: (id, updates) =>
      set((state) => {
        const faq = state.faqs.find((f) => f.id === id);
        if (faq) Object.assign(faq, updates);
      }),
    removeFaq: (id) =>
      set((state) => { state.faqs = state.faqs.filter((f) => f.id !== id); }),
    setLoading: (loading) => set((state) => { state.loading = loading; }),
    setError: (error) => set((state) => { state.error = error; }),
  }))
);
