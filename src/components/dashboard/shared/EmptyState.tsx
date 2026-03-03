'use client';

import { Inbox } from 'lucide-react';

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  action?: { label: string; onClick: () => void };
}

export default function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="p-4 rounded-full bg-white/5 mb-4">
        {icon || <Inbox size={32} className="text-white/30" />}
      </div>
      <h3 className="text-lg font-semibold text-white/80 mb-1">{title}</h3>
      <p className="text-sm text-white/40 max-w-sm">{description}</p>
      {action && (
        <button
          onClick={action.onClick}
          className="mt-4 px-4 py-2 text-sm font-medium rounded-lg bg-cyan text-navy hover:bg-cyan-light transition-colors"
        >
          {action.label}
        </button>
      )}
    </div>
  );
}
