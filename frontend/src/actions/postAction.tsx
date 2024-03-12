import {
  PostType,
  PostUpdateSchemaType,
  PostsResponseType,
} from "../utils/post.schema";

const url: string | undefined = process.env.REACT_APP_URL;

// get posts
export const getPosts = async (page?: number, perPage?: number) => {
  const res = await fetch(url + `api/posts?page=${page}&perPage=${perPage}`);
  const data: PostsResponseType = await res.json();
  return data;
};

//get post
export const getPost = async (postId: string) => {
  const res = await fetch(url + "api/posts/" + postId);
  const data: PostType = await res.json();
  return data;
};

// create post
export const addPost = async (bodyContent: FormData) => {
  const headersList = {
    Accept: "*/*",
  };

  try {
    const response = await fetch(url + "api/posts/create/", {
      method: "POST",
      body: bodyContent,
      headers: headersList,
    });

    const data: PostType = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error adding post:", error);
  }
};

//like post
export const likePostFn = async (postId: string, userId: string) => {
  const headersList = {
    Accept: "*/*",
    "Content-Type": "application/json",
  };

  const bodyContent = JSON.stringify({
    posterId: userId,
  });

  const response = await fetch(url + "api/posts/like-post/" + postId, {
    method: "PUT",
    body: bodyContent,
    headers: headersList,
  });

  const data = await response.json();
  console.log(data);
  return data;
};

//delete poste
export const deletePost = async (postId: string, posterId: string) => {
  const headersList = {
    Accept: "*/*",
    "Content-Type": "application/json",
  };

  const bodyContent = JSON.stringify({
    posterId,
  });

  const response = await fetch(url + "api/posts/delete-post/" + postId, {
    method: "DELETE",
    body: bodyContent,
    headers: headersList,
  });

  const data = await response.json();
  console.log(data);
  return data;
};

// update post
export const updatePostFn = async (
  postData: PostUpdateSchemaType,
  postId: string
) => {
  const headersList = {
    Accept: "*/*",
    "Content-Type": "application/json",
  };

  const bodyContent = JSON.stringify(postData);

  const response = await fetch(url + "api/posts/update-post/" + postId, {
    method: "PUT",
    body: bodyContent,
    headers: headersList,
  });

  const data = await response.json();
  console.log(data);
  return data;
};

//upload pochette
export const uploadPochetteFn = async (formData: FormData) => {
  const headersList = {
    Accept: "*/*",
  };

  const response = await fetch(url + "api/posts/upload-pochette/", {
    method: "POST",
    body: formData,
    headers: headersList,
  });

  const data = await response.json();
  console.log(data);
  return data;
};

export type CommentType = {
  commenterId: string;
  name: string;
  text: string;
};

//comment post
export const commentPostFn = async (
  commentData: CommentType,
  postId: string
) => {
  const headersList = {
    Accept: "*/*",
    "Content-Type": "application/json",
  };

  const bodyContent = JSON.stringify(commentData);

  const response = await fetch(url + "api/posts/comment-post/" + postId, {
    method: "PATCH",
    body: bodyContent,
    headers: headersList,
  });

  const data = await response.json();
  console.log(data);
  return data;
};
