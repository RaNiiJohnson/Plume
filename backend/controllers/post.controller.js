const {
  createPost,
  updatePost,
  deletePost,
  likeAndDislike,
  getPost,
  getAllPost,
} = require("../services/post.service");

module.exports.createPostController = async (req, res) => {
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
};

module.exports.updatePostController = async (req, res) => {
  try {
    const updatedPost = await updatePost(req.params, req.body);
    res.status(200).json({
      updatedPost,
      message: "Post has been updated Successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Post update failed",
      err,
    });
  }
};
module.exports.deletePostController = async (req, res) => {
  try {
    const deletedPost = await deletePost(req.params, req.body);
    res.status(200).json({
      deletedPost,
      message: "Post has been deleted Successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Post deletion failed",
      err,
    });
  }
};

module.exports.likeAndDislikeController = async (req, res) => {
  try {
    const post = await likeAndDislike(req.params, req.body);
    res.status(200).json({
      post,
      message: "Post like or dislike action has been completed",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Post Like or dislike action failed",
      err,
    });
  }
};

module.exports.getPostController = async (req, res) => {
  try {
    const post = await getPost(req.params);
    res.status(200).json({
      post,
      message: "Post has been fetched Successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Post fetch failed",
      err,
    });
  }
};
module.exports.getAllPostController = async (req, res) => {
  try {
    const post = await getAllPost();
    res.status(200).json({
      post,
      message: "Post has been fetched Successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Post fetch failed",
      err,
    });
  }
};
