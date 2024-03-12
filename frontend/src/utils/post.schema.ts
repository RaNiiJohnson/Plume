import { z } from "zod";

export const PostSchema = z.object({
  _id: z.string(),
  posterId: z.string(),
  description: z.string(),
  artist: z.string(),
  title: z.string(),
  lyrics: z.string(),
  likers: z.array(z.string()),
  pochette: z.string(),
  comments: z.array(
    z.object({
      _id: z.string(),
      commenterId: z.string(),
      commenterPseudo: z.string(),
      text: z.string(),
      timestamp: z.number(),
    })
  ),
  createdAt: z.date(),
});
export const PostUpdateSchema = z.object({
  description: z.string().optional(),
  artist: z.string().optional(),
  title: z.string().optional(),
  lyrics: z.string().optional(),
  pochette: z.string().optional(),
});

export const PostsSchema = z.array(PostSchema);

export const PostsResponseSchema = z.object({
  posts: PostsSchema,
  totalPages: z.number(),
});

export const PostResponseSchema = z.object({
  post: PostSchema,
});

export type PostType = z.infer<typeof PostSchema>;
export type PostsType = z.infer<typeof PostsSchema>;
export type PostsResponseType = z.infer<typeof PostsResponseSchema>;
export type PostUpdateSchemaType = z.infer<typeof PostUpdateSchema>;
