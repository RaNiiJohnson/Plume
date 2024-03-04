const router = require("express").Router();
const postController = require("../controllers/post.controller");
const {
  uploadImage,
  upload,
} = require("../controllers/upload.post.controller");

router.get("/", postController.getAllPostController);
router.get("/:id", postController.getPostController);
router.post("/create-post", postController.createPostController);
router.post("/create", uploadImage, upload);
router.put("/update-post/:id", postController.updatePostController);
router.delete("/delete-post/:id", postController.deletePostController);
router.put("/like-post/:id", postController.likeAndDislikeController);

module.exports = router;
