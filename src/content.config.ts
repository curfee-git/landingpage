import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'zod';

const blog = defineCollection({
  loader: glob({ pattern: ['**/*.md', '!**/_*.md'], base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    excerpt: z.string(),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    topic: z.string(),
    tags: z.array(z.string()).default([]),
    author: z.string().default('Philipp Höllinger'),
    readingTimeMinutes: z.number().optional(),
    coverImage: z.string().optional(),
    coverImageAlt: z.string().optional(),
    coverImageWidth: z.number().optional(),
    coverImageHeight: z.number().optional(),
  }),
});

export const collections = { blog };
