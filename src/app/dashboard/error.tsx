'use client';

import { AlertCircle, RotateCcw } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-4">
      <div className="w-16 h-16 rounded-2xl bg-red-500/10 flex items-center justify-center mb-4">
        <AlertCircle size={32} className="text-red-400" />
      </div>
      <h2 className="text-xl font-bold text-white mb-2">Algo salió mal</h2>
      <p className="text-sm text-white/50 max-w-md mb-6">
        {error.message || 'Ocurrió un error inesperado. Por favor intenta de nuevo.'}
      </p>
      <Button onClick={reset} icon={<RotateCcw size={14} />}>
        Intentar de nuevo
      </Button>
    </div>
  );
}
