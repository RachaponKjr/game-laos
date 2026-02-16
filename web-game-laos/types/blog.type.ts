import z from "zod";

export const BlogType = z.object({
  id: z.string(),
  title: z.string(),
  content: z.string(),
  imageUrl: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  metaDescription: z.string(),
  metaTitle: z.string(),
  status: z.string(),
  tag: z.string(),
  viewCount: z.number(),
});

export type BlogType = z.infer<typeof BlogType>;
