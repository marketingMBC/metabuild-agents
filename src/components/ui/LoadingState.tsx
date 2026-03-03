import { Loader2 } from 'lucide-react';

interface LoadingStateProps {
  message?: string;
  fullPage?: boolean;
}

export default function LoadingState({ message = 'Cargando...', fullPage = false }: LoadingStateProps) {
  const content = (
    <div className="flex flex-col items-center justify-center gap-3 py-12">
      <Loader2 size={32} className="text-cyan animate-spin" />
      <p className="text-sm text-white/50">{message}</p>
    </div>
  );

  if (fullPage) {
    return <div className="min-h-[60vh] flex items-center justify-center">{content}</div>;
  }

  return content;
}
