import { capturePending, createChat, createChatBackground, createDialog, fitComposer, morphPendingToReply, type ChatInstance } from '@yewdiel21/motion-kit';
import { getLang } from '../i18n';
import { translations } from '../../data/translations';
import type { ChatMessage } from '../../lib/chat-request';
import { revealChatReply } from './chat-reply';

/** Render basic emphasis and links as DOM nodes, never as model-supplied HTML. */
function formatReply(element: HTMLElement, text: string) {
  element.replaceChildren();
  let offset = 0;
  const tokens = /\*\*([^*\n]+)\*\*|`([^`\n]+)`|\[([^\]\n]+)\]\((https?:\/\/[^\s)]+)\)|(https?:\/\/[^\s<>]+)/g;
  for (const match of text.matchAll(tokens)) {
    element.append(text.slice(offset, match.index));
    if (match[1] || match[2]) {
      const inline = document.createElement(match[1] ? 'strong' : 'code');
      inline.textContent = match[1] ?? match[2];
      element.append(inline);
    } else {
      const raw = match[4] ?? match[5];
      const url = raw.replace(/[.,;)]+$/, '');
      const link = document.createElement('a');
      link.href = url;
      link.textContent = match[3] ?? url;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      element.append(link);
      if (match[5]) element.append(raw.slice(url.length));
    }
    offset = match.index! + match[0].length;
  }
  element.append(text.slice(offset));
}

export function initPortfolioChat() {
  const dialog = document.querySelector<HTMLDialogElement>('[data-assistant-dialog]');
  const root = dialog?.querySelector<HTMLElement>('[data-chat-root]');
  const launcher = document.querySelector<HTMLButtonElement>('[data-chat-open]');
  const input = root?.querySelector<HTMLTextAreaElement>('[data-mk-part="input"]');
  const sendButton = root?.querySelector<HTMLButtonElement>('[data-mk-part="send"]');
  const stopButton = root?.querySelector<HTMLButtonElement>('[data-chat-stop]');
  if (!dialog || !root || !launcher || !input || !sendButton || !stopButton) return;

  document.documentElement.dataset.mkMode = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
  const modal = createDialog(dialog, { triggers: false, drag: false, autoResize: false });
  const background = createChatBackground(dialog.querySelector<HTMLElement>('[data-chat-background]'));
  const history: ChatMessage[] = [];
  let chat: ChatInstance;
  let busy = false;
  let controller: AbortController | null = null;

  const remember = (question: string, answer: string) => {
    history.push({ role: 'user', content: question }, { role: 'assistant', content: answer.slice(0, 6000) });
    if (history.length > 8) history.splice(0, history.length - 8);
  };

  async function ask(question: string) {
    if (busy) return;
    busy = true;
    const list = chat.messages;
    // Sending brings the question into view. Preserve that intent even when a
    // fast answer arrives before the kit finishes scrolling to the question.
    let followReply = true;
    let previousTop = list.scrollTop;
    const trackReading = () => {
      if (list.scrollTop < previousTop - 1) followReply = false;
      else if (list.scrollHeight - list.clientHeight - list.scrollTop < 32) followReply = true;
      previousTop = list.scrollTop;
    };
    list.addEventListener('scroll', trackReading, { passive: true });
    background.busy(true);
    const copy = translations[getLang()].chat;
    controller = new AbortController();
    const timeout = window.setTimeout(() => controller?.abort('timeout'), 35000);
    sendButton!.hidden = true;
    stopButton!.hidden = false;
    root!.querySelector('[data-chat-suggestions]')?.setAttribute('hidden', '');
    const status = root!.querySelector<HTMLElement>('[data-chat-status]');
    if (status) status.textContent = copy.thinking;
    chat.add('user', question);
    chat.pending();
    let answer = '';
    try {
      let previous = history.slice(-8);
      while (previous.length && previous.reduce((sum, item) => sum + item.content.length, question.length) > 12000) previous = previous.slice(2);
      const response = await fetch('/api/chat', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lang: getLang(), messages: [...previous, { role: 'user', content: question }] }),
        signal: controller.signal,
      });
      if (!response.ok || !response.body) throw new Error(response.status === 429 ? 'rate-limit' : 'unavailable');
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      try {
        while (true) {
          const { value, done } = await reader.read();
          if (done) break;
          answer += decoder.decode(value, { stream: true });
        }
        answer += decoder.decode();
      } finally {
        reader.releaseLock();
      }
      if (!answer.trim()) throw new Error('empty');
      clearTimeout(timeout);
      const message = document.createElement('div');
      message.dataset.mkMessage = '';
      message.dataset.mkRole = 'assistant';
      const text = document.createElement('span');
      text.dataset.mkText = '';
      formatReply(text, answer);
      message.append(text);
      list.removeEventListener('scroll', trackReading);
      const shown = await revealChatReply(message, list, () => {
        const pending = capturePending(list.querySelector('[data-mk-pending]'));
        // Clear the kit's pending timer before taking over progressive layout.
        // Reinstall after mounting so its observer adopts the reply as history.
        chat.destroy();
        list.append(message);
        morphPendingToReply(pending, message);
        installChat();
      }, controller.signal, followReply);
      remember(question, shown);
    } catch (error) {
      const stopped = controller.signal.aborted && controller.signal.reason !== 'timeout';
      const notice = stopped ? copy.stopped : error instanceof Error && error.message === 'rate-limit' ? copy.rateLimit : copy.error;
      chat.reply(notice);
    } finally {
      clearTimeout(timeout);
      list.removeEventListener('scroll', trackReading);
      background.busy(false);
      if (status) status.textContent = '';
      sendButton!.hidden = false;
      stopButton!.hidden = true;
      busy = false;
      controller = null;
      if (modal.isOpen) input!.focus({ preventScroll: true });
      // Reinstall to pick up translated thinking copy without touching the conversation.
      installChat();
    }
  }

  function installChat() {
    chat?.destroy();
    chat = createChat(root!, { labels: { thinking: translations[getLang()].chat.thinking }, onSend: (text) => void ask(text) });
  }
  installChat();

  root.addEventListener('mk:send', (event) => {
    if (busy || (event as CustomEvent).detail.text.length > 1200) event.preventDefault();
  });
  launcher.addEventListener('click', () => modal.open(launcher));
  dialog.addEventListener('mk:open', () => {
    launcher.setAttribute('aria-expanded', 'true');
    fitComposer(input);
  });
  addEventListener('resize', () => { if (modal.isOpen) fitComposer(input); });
  dialog.addEventListener('mk:closed', () => launcher.setAttribute('aria-expanded', 'false'));
  stopButton.addEventListener('click', () => controller?.abort());
  root.querySelectorAll<HTMLButtonElement>('[data-chat-suggestion]').forEach((button) => {
    button.addEventListener('click', () => {
      input.value = button.textContent?.trim() ?? '';
      root.querySelector<HTMLFormElement>('form')?.requestSubmit();
    });
  });
  addEventListener('languagechange', () => { if (!busy) installChat(); });
}
