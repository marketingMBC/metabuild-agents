'use client';

import { useCallback } from 'react';
import ScoreNavbar from '@/components/score/ScoreNavbar';
import ScanningAnimation from '@/components/score/ScanningAnimation';
import ScanResults from '@/components/score/ScanResults';
import EvaluationWizard from '@/components/score/EvaluationWizard';
import ScoreResults from '@/components/score/ScoreResults';
import { useScoreStore } from '@/lib/score/store';
import ScoreHero from '@/components/score/ScoreHero';
import ScoreFeatures from '@/components/score/ScoreFeatures';
import ScoreFooter from '@/components/score/ScoreFooter';

export default function ScorePage() {
  const { step, url, isScanning, scanError, setStep, setUrl, setScanResult, setIsScanning, setScanError } =
    useScoreStore();

  const handleAnalyze = useCallback(
    async (inputUrl: string) => {
      setUrl(inputUrl);
      setIsScanning(true);
      setScanError(null);
      setStep('scanning');

      try {
        const res = await fetch('/api/score/scan', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url: inputUrl }),
        });

        const data = await res.json();

        if (!res.ok) {
          setScanError(data.error || 'Error al analizar el sitio');
          setStep('input');
          return;
        }

        setScanResult(data);
        setStep('scanning'); // keep scanning animation briefly

        // Small delay for animation effect
        setTimeout(() => {
          setIsScanning(false);
          setStep('scan-results');
        }, 2000);
      } catch {
        setScanError('Error de conexion. Verifica la URL e intenta de nuevo.');
        setIsScanning(false);
        setStep('input');
      }
    },
    [setUrl, setIsScanning, setScanError, setStep, setScanResult]
  );

  return (
    <main className="min-h-screen bg-navy">
      <ScoreNavbar />

      {step === 'input' && (
        <>
          <ScoreHero onAnalyze={handleAnalyze} error={scanError} />
          <ScoreFeatures />
          <ScoreFooter />
        </>
      )}

      {step === 'scanning' && isScanning && <ScanningAnimation url={url} />}

      {step === 'scan-results' && <ScanResults />}

      {step === 'evaluation' && <EvaluationWizard />}

      {step === 'results' && <ScoreResults />}
    </main>
  );
}
