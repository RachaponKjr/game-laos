import z from "zod";

export const BannerSchema = z.object({
  id: z.string(),
  imageUrl: z.string(),
  isActive: z.boolean(),
  title: z.string(),
  description: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type BannerType = z.infer<typeof BannerSchema>;
