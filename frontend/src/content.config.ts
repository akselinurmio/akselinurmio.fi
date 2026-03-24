import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const home = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/content/home" }),
  schema: z.object({
    locale: z.string().optional(),
    imageAlt: z.string(),
    heading: z.string(),
    title: z.string(),
    description: z.string(),
  }),
});

export const collections = { home };
