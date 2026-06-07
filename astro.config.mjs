// @ts-check
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.orientos.ai',
  output: 'static',
  adapter: vercel(),
  trailingSlash: 'never',
  build: {
    format: 'file',
  },
});
