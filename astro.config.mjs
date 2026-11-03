// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import vercel from '@astrojs/vercel';

// TODO: Replace with your actual deployed domain
const SITE_URL = 'https://yewdielmedina.dev';

// https://astro.build/config
export default defineConfig({
  site: SITE_URL,
  adapter: vercel(),
  // The old single CV file now points to the current Spanish CV.
  redirects: { '/CV.pdf': '/cv/yewdiel-medina-cv-es.pdf' },
  devToolbar: { enabled: false },
  vite: {
    plugins: [tailwindcss()],
  },
});
