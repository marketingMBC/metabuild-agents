import { StickyNote } from 'lucide-react';

interface InternalNoteBubbleProps {
  authorName: string;
  content: string;
  timestamp: string;
}

export default function InternalNoteBubble({ authorName, content, timestamp }: InternalNoteBubbleProps) {
  return (
    <div className="flex justify-center my-2">
      <div className="max-w-[85%] bg-amber-500/10 border border-amber-500/20 rounded-xl px-4 py-2.5">
        <div className="flex items-center gap-1.5 mb-1">
          <StickyNote size={12} className="text-amber-400" />
          <span className="text-[10px] font-medium text-amber-400">Nota interna — {authorName}</span>
        </div>
        <p className="text-sm text-amber-200/80">{content}</p>
        <p className="text-[10px] text-amber-400/50 mt-1">{timestamp}</p>
      </div>
    </div>
  );
}
