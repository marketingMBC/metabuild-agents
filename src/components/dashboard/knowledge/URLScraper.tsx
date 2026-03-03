'use client';

import { useState } from 'react';
import { Globe, Plus, Trash2, CheckCircle, Loader2 } from 'lucide-react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

interface UrlItem {
  url: string;
  status: 'ready' | 'processing';
  pages: number;
}

const MOCK_URLS: UrlItem[] = [
  { url: 'https://metabuild.cl/faq', status: 'ready', pages: 12 },
  { url: 'https://metabuild.cl/servicios', status: 'ready', pages: 5 },
];

export default function URLScraper() {
  const [urls, setUrls] = useState(MOCK_URLS);
  const [newUrl, setNewUrl] = useState('');
  const [scraping, setScraping] = useState(false);

  const handleAdd = async () => {
    if (!newUrl.trim()) return;
    setScraping(true);
    setUrls((prev) => [...prev, { url: newUrl, status: 'processing' as const, pages: 0 }]);
    setNewUrl('');

    // Simulate scraping
    await new Promise((r) => setTimeout(r, 2000));
    setUrls((prev) =>
      prev.map((u) => (u.status === 'processing' ? { ...u, status: 'ready' as const, pages: Math.floor(Math.random() * 10) + 1 } : u))
    );
    setScraping(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <div className="flex-1">
          <Input
            placeholder="https://tu-sitio.com/pagina"
            value={newUrl}
            onChange={(e) => setNewUrl(e.target.value)}
            icon={<Globe size={14} />}
          />
        </div>
        <Button onClick={handleAdd} loading={scraping} icon={<Plus size={14} />}>
          Agregar
        </Button>
      </div>

      <div className="space-y-2">
        {urls.map((item, idx) => (
          <div key={idx} className="flex items-center justify-between p-3 rounded-xl border border-white/10 bg-surface">
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <Globe size={16} className="text-cyan flex-shrink-0" />
              <div className="min-w-0">
                <p className="text-sm text-white truncate">{item.url}</p>
                <p className="text-[10px] text-white/40">
                  {item.status === 'ready' ? `${item.pages} páginas indexadas` : 'Procesando...'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              {item.status === 'ready' ? (
                <CheckCircle size={14} className="text-green-400" />
              ) : (
                <Loader2 size={14} className="text-yellow-400 animate-spin" />
              )}
              <button className="p-1 text-white/20 hover:text-red-400 transition-colors">
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
