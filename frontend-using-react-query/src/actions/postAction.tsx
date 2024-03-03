import axios from "axios";
import { PostType, PostsType } from "../utils/post.schema";

export const getPost = async () => {
  const res = await fetch("http://localhost:5000/api/posts", {
    method: "GET",
    headers: {
      "content-Type": "application/json",
    },
  });
  const data: PostsType = await res.json();
  console.log(data);
  return data;
};

export const addPost = async (data: PostType) => {
  await axios.post("http://localhost:5000/api/postscreate-post/", data);
};

export const likePost = async (postId: string, userId: string) => {
  await axios({
    method: "put",
    url: "http://localhost:5000/api/posts/like-post/" + postId,
    data: { id: userId },
  });
};

export const deletePost = async (postId: string) => {
  await axios({
    method: "put",
    url: "http://localhost:5000/api/posts/delete-post/" + postId,
  });
};
