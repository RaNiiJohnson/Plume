const router = require("express").Router();
import {
  commentPostController,
  deletePostController,
  getAllPostController,
  getPostController,
  likeAndDislikeController,
  updatePostController,
} from "../controllers/post.controller";
import {
  upload as _upload,
  uploadImage as _uploadImage,
} from "../controllers/upload.pochette";
import { upload, uploadImage } from "../controllers/upload.post.controller";

router.get("/", getAllPostController);
router.get("/:id", getPostController);
router.post("/create", uploadImage, upload);
router.post("/upload-pochette", _uploadImage, _upload);
router.put("/update-post/:id", updatePostController);
router.put("/like-post/:id", likeAndDislikeController);
router.delete("/delete-post/:id", deletePostController);
router.patch("/comment-post/:id", commentPostController);

export default router;
