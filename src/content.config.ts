import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Opinion — the Orient blog.
 *
 * To add an article: drop a Markdown file into `src/content/opinion/`.
 * The filename (without `.md`) becomes the URL slug: `/opinion/<slug>`.
 *
 * Cover and in-body images live in `public/opinion/` and are referenced
 * by absolute path, e.g. `cover: "/opinion/my-image.jpg"`.
 */
const opinion = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/opinion' }),
  schema: z.object({
    title: z.string(),
    dek: z.string(),
    author: z.string().default('The Orient Team'),
    role: z.string().optional(),
    date: z.coerce.date(),
    tag: z.string().default('Opinion'),
    cover: z.string().optional(),
    coverAlt: z.string().optional(),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

export const collections = { opinion };
