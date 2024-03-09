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
export const addPost = async (formData: FormData) => {
  try {
    const res = await fetch(url + "api/posts/create/", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    const data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error adding post:", error);
  }
};

// //like post
// export const likePost = async (postId: string, userId: string) => {
//   await axios({
//     method: "put",
//     url: url + "api/posts/like-post/" + postId,
//     data: { id: userId },
//   });
// };

// //delete poste
// export const deletePost = async (postId: string) => {
//   await axios({
//     method: "put",
//     url: url + "api/posts/delete-post/" + postId,
//   });
// };
