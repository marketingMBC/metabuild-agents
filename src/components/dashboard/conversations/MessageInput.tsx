'use client';

import { useState } from 'react';
import { Send, Paperclip, Smile, Slash } from 'lucide-react';
import InternalNoteInput from './InternalNoteInput';
import CannedResponsePicker from './CannedResponsePicker';
import QuickReplyBar from './QuickReplyBar';
import { cn } from '@/lib/utils';

interface MessageInputProps {
  onSend: (message: string, isNote: boolean) => void;
}

export default function MessageInput({ onSend }: MessageInputProps) {
  const [text, setText] = useState('');
  const [isNote, setIsNote] = useState(false);
  const [showCanned, setShowCanned] = useState(false);

  const handleSend = () => {
    if (!text.trim()) return;
    onSend(text, isNote);
    setText('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleTextChange = (value: string) => {
    setText(value);
    if (value.endsWith('/')) {
      setShowCanned(true);
    }
  };

  return (
    <div className="relative border-t border-white/10">
      <QuickReplyBar onSelect={(reply) => setText(reply)} />

      {showCanned && (
        <CannedResponsePicker
          open={showCanned}
          onClose={() => setShowCanned(false)}
          onSelect={(content) => setText(content)}
        />
      )}

      <div className={cn('p-3', isNote && 'bg-amber-500/5')}>
        {isNote && (
          <div className="flex items-center gap-1.5 mb-2 text-xs text-amber-400">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            Escribiendo nota interna (no visible para el contacto)
          </div>
        )}
        <div className="flex items-end gap-2">
          <div className="flex-1">
            <textarea
              value={text}
              onChange={(e) => handleTextChange(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={isNote ? 'Escribe una nota interna...' : 'Escribe un mensaje...'}
              rows={1}
              className={cn(
                'w-full bg-white/[0.03] border rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/40 outline-none resize-none transition-colors',
                isNote ? 'border-amber-500/30 focus:border-amber-500/50' : 'border-white/10 focus:border-cyan/40'
              )}
            />
          </div>
          <div className="flex items-center gap-1">
            <InternalNoteInput active={isNote} onToggle={() => setIsNote(!isNote)} />
            <button
              onClick={() => setShowCanned(!showCanned)}
              className="p-2 text-white/40 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
              title="Respuestas rápidas"
            >
              <Slash size={16} />
            </button>
            <button className="p-2 text-white/40 hover:text-white rounded-lg hover:bg-white/5 transition-colors">
              <Paperclip size={16} />
            </button>
            <button className="p-2 text-white/40 hover:text-white rounded-lg hover:bg-white/5 transition-colors">
              <Smile size={16} />
            </button>
            <button
              onClick={handleSend}
              disabled={!text.trim()}
              className="p-2 bg-cyan text-navy rounded-lg hover:bg-cyan-light disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
