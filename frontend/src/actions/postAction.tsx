import axios from "axios";

import { PostType, PostsType } from "../utils/post.schema";

const url: string | undefined = process.env.REACT_APP_URL;

export const getPost = async () => {
  const res = await fetch(url + "api/posts");
  const data: PostsType = await res.json();
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
