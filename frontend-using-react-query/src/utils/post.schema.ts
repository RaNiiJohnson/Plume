import { z } from "zod";

export const PostSchema = z.object({
  _id: z.string(),
  posterId: z.string(),
  description: z.string(),
  artist: z.string(),
  title: z.string(),
  lyrics: z.string(),
  likers: z.array(z.string()),
  comments: z.object({
    commenterId: z.string(),
    commenterPseudo: z.string(),
    text: z.string(),
    timestamp: z.number(),
  }),
});

export const PostsSchema = z.array(PostSchema);

export const PostsResponseSchema = z.object({
  post: PostsSchema,
});

export const PostResponseSchema = z.object({
  post: PostSchema,
});

export type PostType = z.infer<typeof PostSchema>;
export type PostsType = z.infer<typeof PostsSchema>;
