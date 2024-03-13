const router = require("express").Router();
const postController = require("../controllers/post.controller");
const createPost = require("../controllers/upload.post.controller");
const uploadPochette = require("../controllers/upload.pochette");

router.get("/", postController.getAllPostController);
router.get("/:id", postController.getPostController);
router.post("/create", createPost.uploadImage, createPost.upload);
router.post(
  "/upload-pochette",
  uploadPochette.uploadImage,
  uploadPochette.upload
);
router.put("/update-post/:id", postController.updatePostController);
router.put("/like-post/:id", postController.likeAndDislikeController);
router.delete("/delete-post/:id", postController.deletePostController);
router.patch("/comment-post/:id", postController.commentPostController);

module.exports = router;
