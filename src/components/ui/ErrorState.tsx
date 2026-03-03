import { AlertCircle, RefreshCw } from 'lucide-react';
import Button from './Button';

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export default function ErrorState({
  title = 'Algo salió mal',
  message = 'Ocurrió un error inesperado. Por favor, intenta de nuevo.',
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-12">
      <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center">
        <AlertCircle size={24} className="text-red-400" />
      </div>
      <div className="text-center">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <p className="text-sm text-white/50 mt-1 max-w-md">{message}</p>
      </div>
      {onRetry && (
        <Button variant="secondary" size="sm" onClick={onRetry} icon={<RefreshCw size={14} />}>
          Reintentar
        </Button>
      )}
    </div>
  );
}
