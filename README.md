# Portfolio

Astro portfolio with Motion Kit interactions and a Groq-powered portfolio assistant.

## Local development

Use Node.js 22.23.4 or newer (verified with Node.js 24).

```sh
npm install
cp .env.example .env
npm run dev
```

Set `GROQ_API_KEY` in `.env` to enable the assistant. This is a private server variable; never prefix it with `PUBLIC_`. The assistant uses `openai/gpt-oss-120b`, streams responses and takes its context from the portfolio's project, experience, skills and personal data files.

`PUBLIC_KEY`, `TEMPLATE_ID` and `SERVICE_ID` configure the existing EmailJS form. They are public identifiers delivered to the browser. Keep the form's `name`, `email` and `message` fields aligned with your EmailJS template.

## Deploy to Vercel

The Vercel adapter keeps the portfolio page static and builds `/api/chat` as a server function. Add `GROQ_API_KEY` to the Vercel project's environment variables and redeploy. Add the EmailJS variables before building as well. Local `.env` files are ignored by Git and are not uploaded as credentials.

Astro and the Vercel adapter are on compatible current releases. The `path-to-regexp` override keeps Vercel's routing dependency on the patched 6.x release.

The chat validates conversation roles and size, limits requests per server instance and handles upstream rate limits. It processes only public portfolio context and the conversation the visitor submits. Conversations stay in browser memory for the current page visit.

## Verification

```sh
npm test
npm run build
```

Motion Kit's fill-text reveals About once and keeps it readable when scrolling back; language switches preserve that progress. The portrait uses parallax and the tools stay static. The assistant uses the kit's bubble morph, word motion and animated background, with reduced-motion support. Replies grow word by word; scrolling up pauses automatic following, and returning to the bottom resumes it. Stopping a reply keeps the visible portion in the conversation. Vercel Web Analytics is mounted in the shared layout; enable Web Analytics for the project in the Vercel dashboard before deploying.
