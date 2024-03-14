import PostModel from "../models/post.model";
import {
  createPost,
  updatePost,
  deletePost,
  likeAndDislike,
  getPost,
  commentPost,
} from "../services/post.service";

export async function createPostController(req, res) {
  try {
    const post = await createPost(req.body);
    return res.status(200).json({ message: "Post created Successfully", post });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "An Error Occurred while Creating the post",
      error: err.message,
    });
  }
}

export async function updatePostController(req, res) {
  try {
    const updatedPost = await updatePost(req.params, req.body);
    res.status(200).json(updatedPost);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Post update failed",
      err,
    });
  }
}
export async function deletePostController(req, res) {
  try {
    const deletedPost = await deletePost(req.params, req.body);
    res.status(200).json(deletedPost);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Post deletion failed",
      err,
    });
  }
}

export async function getPostController(req, res) {
  try {
    const post = await getPost(req.params);
    res.status(200).json(post);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Post fetch failed",
      err,
    });
  }
}

export async function getAllPostController(req, res) {
  const page = parseInt(req.query.page) || 1; // numéro de page
  const perPage = parseInt(req.query.perPage) || 10; //  nombre d'éléments par page

  try {
    const totalCount = await PostModel.countDocuments();

    const totalPages = Math.ceil(totalCount / perPage);

    const posts = await PostModel.find()
      .sort({ createdAt: -1 })
      .skip((page - 1) * perPage) // Ignorer les éléments des pages précédentes
      .limit(perPage); // Limitez le nombre de résultats par page

    res.json({ posts, totalPages });
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ message: "Error fetching posts", error });
  }
}

export async function likeAndDislikeController(req, res) {
  try {
    const post = await likeAndDislike(req.params, req.body);
    res.status(200).json(post);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Post Like or dislike action failed",
      err,
    });
  }
}

export async function commentPostController(req, res) {
  try {
    const post = await commentPost(req.params, req.body);
    res.status(200).json(post);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "comment action failed",
      err,
    });
  }
}

export async function editCommentPostController(req, res) {}
