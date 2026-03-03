'use client';

import { useState } from 'react';
import { BookOpen, FileText, HelpCircle, Globe } from 'lucide-react';
import { knowledgeDocuments, faqs } from '@/lib/mock-data';
import { cn } from '@/lib/utils';
import KnowledgeStats from '@/components/dashboard/knowledge/KnowledgeStats';
import DocumentsList from '@/components/dashboard/knowledge/DocumentsList';
import DocumentUploadZone from '@/components/dashboard/knowledge/DocumentUploadZone';
import FAQEditor from '@/components/dashboard/knowledge/FAQEditor';
import URLScraper from '@/components/dashboard/knowledge/URLScraper';

const TABS = [
  { id: 'documents', label: 'Documentos', icon: FileText },
  { id: 'faqs', label: 'FAQs', icon: HelpCircle },
  { id: 'urls', label: 'URLs', icon: Globe },
] as const;

export default function KnowledgePage() {
  const [activeTab, setActiveTab] = useState<'documents' | 'faqs' | 'urls'>('documents');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan/10 flex items-center justify-center">
            <BookOpen size={20} className="text-cyan" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">Base de Conocimiento</h1>
            <p className="text-sm text-white/50">Documentos, FAQs y URLs que alimentan a tus agentes</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <KnowledgeStats documents={knowledgeDocuments} faqs={faqs} />

      {/* Tabs */}
      <div className="flex gap-1 border-b border-white/10 pb-px">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-colors border-b-2 -mb-px',
                activeTab === tab.id
                  ? 'text-cyan border-cyan'
                  : 'text-white/50 hover:text-white border-transparent'
              )}
            >
              <Icon size={16} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Content */}
      <div>
        {activeTab === 'documents' && (
          <div className="space-y-4">
            <DocumentUploadZone />
            <DocumentsList documents={knowledgeDocuments} />
          </div>
        )}
        {activeTab === 'faqs' && <FAQEditor faqs={faqs} />}
        {activeTab === 'urls' && <URLScraper />}
      </div>
    </div>
  );
}
