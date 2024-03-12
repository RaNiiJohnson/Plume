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
router.delete("/delete-post/:id", postController.deletePostController);
router.put("/like-post/:id", postController.likeAndDislikeController);
router.patch("/comment-post/:id", postController.commentPostController);

module.exports = router;

// const multer = require("multer");
// const uploadFile = multer({ dest: "uploads/" });

// router.post("/read-file", uploadFile.single("file"), (req, res) => {
//   const file = req.file;
//   if (!file) {
//     return res.status(400).send("aucun fichier");
//   }

//   const fs = require("fs");
//   fs.readFile(file.path, "utf-8", (err, data) => {
//     if (err) {
//       return res.status(500).send("Erreur lors de lecture du fichier");
//     }
//     console.log(data);
//   });
// });
