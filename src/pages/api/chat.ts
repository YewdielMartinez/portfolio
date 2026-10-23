import type { APIRoute } from 'astro';
import { getSecret } from 'astro:env/server';
import Groq from 'groq-sdk';
import { readChatRequest } from '../../lib/chat-request';
import { portfolioContext } from '../../server/portfolio-context';

export const prerender = false;

// Small, bounded per-instance window; also respects Groq's upstream rate limits.
const visitors = new Map<string, { count: number; reset: number }>();
const jsonError = (status: number, code: string) => Response.json({ error: code }, {
  status, headers: { 'Cache-Control': 'no-store' },
});

export const POST: APIRoute = async ({ request, url, clientAddress }) => {
  const origin = request.headers.get('origin');
  if (origin && origin !== url.origin) return jsonError(403, 'origin');
  if (!request.headers.get('content-type')?.includes('application/json')) return jsonError(415, 'content-type');
  const body = await readChatRequest(request);
  if (!body) return jsonError(400, 'invalid-message');
  const apiKey = getSecret('GROQ_API_KEY');
  if (!apiKey) return jsonError(503, 'unavailable');

  const now = Date.now();
  for (const [key, value] of visitors) if (value.reset <= now) visitors.delete(key);
  const address = clientAddress || 'local';
  const visitor = visitors.get(address) ?? { count: 0, reset: now + 60000 };
  if (visitor.count >= 10 || visitors.size >= 5000) return jsonError(429, 'rate-limit');
  visitor.count += 1;
  visitors.set(address, visitor);

  const abort = new AbortController();
  const disconnect = () => abort.abort();
  request.signal.addEventListener('abort', disconnect, { once: true });
  const timeout = setTimeout(disconnect, 30000);
  const cleanup = () => {
    clearTimeout(timeout);
    request.signal.removeEventListener('abort', disconnect);
  };
  try {
    const groq = new Groq({ apiKey, maxRetries: 0, timeout: 25000 });
    const completion = await groq.chat.completions.create({
      model: 'openai/gpt-oss-120b',
      messages: [{ role: 'system', content: portfolioContext(body.lang) }, ...body.messages],
      temperature: 1,
      max_completion_tokens: 2048,
      top_p: 1,
      stream: true,
      reasoning_effort: 'medium',
      include_reasoning: false,
    }, { signal: abort.signal });

    const encoder = new TextEncoder();
    const stream = new ReadableStream<Uint8Array>({
      async start(controller) {
        try {
          for await (const chunk of completion) {
            const content = chunk.choices[0]?.delta?.content;
            if (content) controller.enqueue(encoder.encode(content));
          }
          controller.close();
        } catch {
          controller.error(new Error('Chat stream interrupted'));
        } finally {
          cleanup();
        }
      },
      cancel() {
        abort.abort();
        cleanup();
      },
    });
    return new Response(stream, { headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-store, no-transform',
      'X-Content-Type-Options': 'nosniff',
    } });
  } catch (error) {
    cleanup();
    return jsonError(error instanceof Groq.RateLimitError ? 429 : 503, 'unavailable');
  }
};
