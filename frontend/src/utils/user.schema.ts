import { z } from "zod";

export const UserSchema = z.object({
  _id: z.string(),
  pseudo: z.string(),
  picture: z.string(),
  password: z.string(),
});

export const UsersSchema = z.array(UserSchema);

export const UsersResponseSchema = z.object({
  users: UsersSchema,
});

export const UserResponseSchema = z.object({
  user: UserSchema,
});

export type userType = z.infer<typeof UserSchema>;

export type usersType = z.infer<typeof UsersSchema>;
