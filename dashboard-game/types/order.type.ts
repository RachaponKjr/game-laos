import { z } from "zod";
import { GameSchema, PackageSchema } from "./game.type";
import { UserSchema } from "./user.type";

export const OrderSchema = z.object({
  id: z.string(),
  game: GameSchema,
  gameAccount: z.string(),
  gmaeId: z.string(),
  meta: z.object({}),
  package: PackageSchema,
  packageId: z.string(),
  status: z.string(),
  totalPrice: z.number(),
  userId: z.string(),
  createdAt: z.date(),
  user: UserSchema,
});

export type Order = z.infer<typeof OrderSchema>;
