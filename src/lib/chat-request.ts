export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface ChatRequest {
  lang: 'en' | 'es';
  messages: ChatMessage[];
}

/** Visitors supply conversation text; the server always owns the system context. */
export function parseChatRequest(body: unknown): ChatRequest | null {
  if (!body || typeof body !== 'object') return null;
  const { messages, lang } = body as Record<string, unknown>;
  if (!Array.isArray(messages) || !messages.length || messages.length > 11 || messages.length % 2 === 0) return null;
  const clean: ChatMessage[] = [];
  let total = 0;
  for (const [index, value] of messages.entries()) {
    if (!value || typeof value !== 'object') return null;
    const { role, content } = value as Record<string, unknown>;
    if (role !== (index % 2 ? 'assistant' : 'user') || typeof content !== 'string') return null;
    const text = content.trim();
    if (!text || text.length > (role === 'user' ? 1200 : 6000)) return null;
    total += text.length;
    if (total > 18000) return null;
    clean.push({ role, content: text } as ChatMessage);
  }
  return { lang: lang === 'es' ? 'es' : 'en', messages: clean };
}

export async function readChatRequest(request: Request): Promise<ChatRequest | null> {
  if (!request.body || Number(request.headers.get('content-length')) > 32768) return null;
  const reader = request.body.getReader();
  const decoder = new TextDecoder();
  let bytes = 0;
  let text = '';
  try {
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      bytes += value.byteLength;
      if (bytes > 32768) {
        await reader.cancel();
        return null;
      }
      text += decoder.decode(value, { stream: true });
    }
    text += decoder.decode();
    return parseChatRequest(JSON.parse(text));
  } catch {
    return null;
  } finally {
    reader.releaseLock();
  }
}
