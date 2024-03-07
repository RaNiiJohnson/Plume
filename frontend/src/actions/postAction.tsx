import axios from "axios";

import { PostType, PostsType } from "../utils/post.schema";

const url: string | undefined = process.env.REACT_APP_URL;

export const getPosts = async () => {
  const res = await fetch(url + "api/posts");
  const data: PostsType = await res.json();
  return data;
};

export const getPostsUser = async (userId: string) => {
  const res = await fetch(url + "api/posts");
  const data: PostsType = await res.json();
  const results = data.filter((result) => {
    return result.posterId === userId;
  });
  return results;
};

export const getPost = async (postId: string) => {
  const res = await fetch(url + "api/posts/" + postId);
  const data: PostType = await res.json();
  return data;
};

export const addPost = async (data: PostType) => {
  await axios.post(url + "api/posts/create-post/", data);
};

export const likePost = async (postId: string, userId: string) => {
  await axios({
    method: "put",
    url: url + "api/posts/like-post/" + postId,
    data: { id: userId },
  });
};

export const deletePost = async (postId: string) => {
  await axios({
    method: "put",
    url: url + "api/posts/delete-post/" + postId,
  });
};
