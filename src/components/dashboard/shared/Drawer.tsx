'use client';

import { useEffect } from 'react';
import { X } from 'lucide-react';

interface DrawerProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  width?: string;
}

export default function Drawer({ open, onClose, title, children, width = 'w-96' }: DrawerProps) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <>
      {open && (
        <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />
      )}
      <div
        className={`fixed top-0 right-0 h-full ${width} bg-surface border-l border-white/10 z-50 transition-transform duration-300 shadow-2xl ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
          <h2 className="text-lg font-semibold text-white">{title}</h2>
          <button onClick={onClose} className="p-1 text-white/40 hover:text-white rounded-lg hover:bg-white/5">
            <X size={18} />
          </button>
        </div>
        <div className="overflow-y-auto h-[calc(100%-65px)] px-6 py-4">
          {children}
        </div>
      </div>
    </>
  );
}
