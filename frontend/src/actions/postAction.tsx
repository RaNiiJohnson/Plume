import { PostType, PostsResponseType } from "../utils/post.schema";

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

    const data = await response.text();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error adding post:", error);
  }
};

// //like post
export const likePost = async (postId: string, userId: string) => {
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

  const data = await response.text();
  console.log(data);
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

  const data = await response.text();
  console.log(data);
};

// update post
export const updatePost = async (
  postData: Omit<PostType, "comments">,
  postId: string
) => {
  const headersList = {
    Accept: "*/*",
    "Content-Type": "application/json",
  };

  const bodyContent = JSON.stringify({
    postData,
  });

  const response = await fetch(url + "api/posts/update-post/" + postId, {
    method: "PUT",
    body: bodyContent,
    headers: headersList,
  });

  const data = await response.text();
  console.log(data);
};
