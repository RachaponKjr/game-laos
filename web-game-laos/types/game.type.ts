import z from "zod";

export const GameSchema = z.object({
  id: z.string(),
  category: z.string(),
  isActive: z.boolean(),
  image: z.string(),
  imageBannerUrl: z.string().nullable(),
  name: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  videoUrl: z.string().nullable(),
});

export const GamePackageSchema = z.object({
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
});

export type GameType = z.infer<typeof GameSchema>;

export type GamePackageType = z.infer<typeof GamePackageSchema>;
