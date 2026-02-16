import z from "zod";

export const UserSchema = z.object({
  createdAt: z.string(),
  email: z.string(),
  id: z.string(),
  image: z.string(),
  name: z.string(),
  updatedAt: z.string(),
});

export type User = z.infer<typeof UserSchema>;
