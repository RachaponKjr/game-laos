import z from "zod";

export const BannerSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  linkUrl: z.string(),
  isActive: z.boolean(),
  imageUrl: z.string(),
});

export type BannerType = z.infer<typeof BannerSchema>;
