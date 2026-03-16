import { NextRequest, NextResponse } from 'next/server';
import { CHATBOT_SIGNATURES } from '@/lib/score/categories';
import type { ScanResult, DetectedTechnology, SiteMetadata } from '@/lib/score/types';

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json();

    if (!url || typeof url !== 'string') {
      return NextResponse.json({ error: 'URL requerida' }, { status: 400 });
    }

    // Normalize URL
    let normalizedUrl = url.trim();
    if (!normalizedUrl.startsWith('http://') && !normalizedUrl.startsWith('https://')) {
      normalizedUrl = 'https://' + normalizedUrl;
    }

    // Validate URL format
    let parsedUrl: URL;
    try {
      parsedUrl = new URL(normalizedUrl);
    } catch {
      return NextResponse.json({ error: 'URL invalida' }, { status: 400 });
    }

    const startTime = Date.now();

    // Fetch the website HTML
    let html: string;
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 15000);

      const response = await fetch(normalizedUrl, {
        signal: controller.signal,
        headers: {
          'User-Agent':
            'Mozilla/5.0 (compatible; AgentScoreBot/2.0; +https://metabuildagents.com/score)',
          Accept: 'text/html,application/xhtml+xml',
        },
        redirect: 'follow',
      });

      clearTimeout(timeout);

      if (!response.ok) {
        return NextResponse.json(
          { error: `No se pudo acceder al sitio (HTTP ${response.status})` },
          { status: 422 }
        );
      }

      html = await response.text();
    } catch (err: unknown) {
      const message =
        err instanceof Error && err.name === 'AbortError'
          ? 'El sitio tardo demasiado en responder (timeout 15s)'
          : 'No se pudo conectar al sitio web. Verifica que la URL sea correcta.';
      return NextResponse.json({ error: message }, { status: 422 });
    }

    const loadTime = Date.now() - startTime;

    // Extract metadata
    const metadata = extractMetadata(html, parsedUrl);

    // Detect chatbot technologies
    const htmlLower = html.toLowerCase();
    const technologies: DetectedTechnology[] = [];

    for (const sig of CHATBOT_SIGNATURES) {
      const matchCount = sig.patterns.filter((p) => htmlLower.includes(p.toLowerCase())).length;
      if (matchCount > 0) {
        const confidence = Math.min(100, Math.round((matchCount / sig.patterns.length) * 100));
        technologies.push({
          name: sig.name,
          confidence,
          type: sig.type,
          description: sig.description,
        });
      }
    }

    // Sort by confidence
    technologies.sort((a, b) => b.confidence - a.confidence);

    const chatbotDetected = technologies.length > 0;
    const topTech = technologies[0] || null;

    const result: ScanResult = {
      url: normalizedUrl,
      chatbotDetected,
      technology: topTech?.name || null,
      technologies,
      widgetVisible: chatbotDetected,
      https: parsedUrl.protocol === 'https:',
      loadTime,
      metadata,
    };

    return NextResponse.json(result);
  } catch {
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

function extractMetadata(html: string, url: URL): SiteMetadata {
  const titleMatch = html.match(/<title[^>]*>([^<]*)<\/title>/i);
  const descMatch = html.match(
    /<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i
  );
  const faviconMatch = html.match(
    /<link[^>]*rel=["'](?:shortcut )?icon["'][^>]*href=["']([^"']*)["']/i
  );

  let favicon = faviconMatch?.[1] || null;
  if (favicon && !favicon.startsWith('http')) {
    favicon = `${url.origin}${favicon.startsWith('/') ? '' : '/'}${favicon}`;
  }

  return {
    title: titleMatch?.[1]?.trim() || url.hostname,
    description: descMatch?.[1]?.trim() || '',
    favicon: favicon || `https://www.google.com/s2/favicons?domain=${url.hostname}&sz=64`,
    domain: url.hostname,
  };
}
