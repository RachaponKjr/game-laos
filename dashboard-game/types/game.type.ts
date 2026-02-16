import { z } from "zod";

export const GameSchema = z.object({
  id: z.string(),
  name: z.string(),
  category: z.string(),
  isActive: z.boolean(),
  imageUrl: z.string(),
  imageBannerUrl: z.string(),
  videoUrl: z.string(),
  config: z.object({
    servers: z.array(z.string()),
    requireServerSelection: z.boolean(),
  }),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const PackageSchema = z.object({
  id: z.string(),
  name: z.string(),
  amount: z.number(),
  price: z.number(),
  discount: z.number(),
  cost: z.number(),
  bonus: z.number(),
  icon_base64: z.string(),
  gameId: z.string(),
  recommend: z.boolean(),
  isActive: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Game = z.infer<typeof GameSchema>;
export type Package = z.infer<typeof PackageSchema>;
