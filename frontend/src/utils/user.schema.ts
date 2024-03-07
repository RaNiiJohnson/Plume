import { z } from "zod";

export const UserSchema = z.object({
  _id: z.string(),
  pseudo: z.string(),
  picture: z.string().optional(),
});

export const userData = z.object({
  _id: z.string(),
  token: z.string(),
});

export const UsersSchema = z.array(UserSchema);

export const UsersResponseSchema = z.object({
  users: UsersSchema,
});

export const UserResponseSchema = z.object({
  user: UserSchema,
});

export type userType = z.infer<typeof UserSchema>;

export type userDataType = z.infer<typeof userData>;

export type usersType = z.infer<typeof UsersSchema>;
