'use client';

import { useState } from 'react';
import { Send, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TestTabProps {
  agentName: string;
  greeting: string;
}

interface TestMessage {
  id: string;
  sender: 'user' | 'agent';
  content: string;
}

const MOCK_RESPONSES = [
  '\u00A1Claro! Con gusto te ayudo con eso.',
  'Dejame verificar la informacion. Un momento por favor.',
  'Tenemos varias opciones disponibles. \u00BFCual te interesa mas?',
  'Perfecto, he registrado tu solicitud. Te contactaremos pronto.',
  '\u00BFHay algo mas en lo que pueda ayudarte?',
];

export default function TestTab({ agentName, greeting }: TestTabProps) {
  const [messages, setMessages] = useState<TestMessage[]>([
    { id: '1', sender: 'agent', content: greeting || '\u00A1Hola! \u00BFEn que puedo ayudarte?' },
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg: TestMessage = { id: Date.now().toString(), sender: 'user', content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');

    // Simulate agent response
    setTimeout(() => {
      const response = MOCK_RESPONSES[Math.floor(Math.random() * MOCK_RESPONSES.length)];
      setMessages((prev) => [...prev, { id: (Date.now() + 1).toString(), sender: 'agent', content: response }]);
    }, 800);
  };

  const handleReset = () => {
    setMessages([{ id: '1', sender: 'agent', content: greeting || '\u00A1Hola! \u00BFEn que puedo ayudarte?' }]);
  };

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-white/10 bg-surface overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-400" />
            <span className="text-sm font-medium text-white">Chat de prueba — {agentName}</span>
          </div>
          <button onClick={handleReset} className="p-1.5 text-white/40 hover:text-white rounded-lg hover:bg-white/5">
            <RefreshCw size={14} />
          </button>
        </div>

        {/* Messages */}
        <div className="h-80 overflow-y-auto p-4 space-y-3">
          {messages.map((msg) => (
            <div key={msg.id} className={cn('flex', msg.sender === 'user' ? 'justify-end' : 'justify-start')}>
              <div className={cn(
                'max-w-[75%] px-3.5 py-2.5 rounded-2xl text-sm',
                msg.sender === 'user'
                  ? 'bg-cyan text-navy rounded-br-md'
                  : 'bg-white/10 text-white rounded-bl-md'
              )}>
                {msg.content}
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="border-t border-white/10 p-3 flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Escribe un mensaje de prueba..."
            className="flex-1 bg-white/[0.03] border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-white/40 outline-none focus:border-cyan/40"
          />
          <button
            onClick={handleSend}
            className="p-2 bg-cyan text-navy rounded-lg hover:bg-cyan-light transition-colors"
          >
            <Send size={16} />
          </button>
        </div>
      </div>

      <p className="text-xs text-white/30 text-center">
        Las respuestas son simuladas. En produccion, el agente usara tu configuracion real.
      </p>
    </div>
  );
}
