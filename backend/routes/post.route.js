const router = require("express").Router();
const postController = require("../controllers/post.controller");
const {
  uploadImage,
  upload,
} = require("../controllers/upload.post.controller");

router.get("/", postController.getAllPostController);
router.get("/:id", postController.getPostController);
router.post("/create", uploadImage, upload);
router.put("/update-post/:id", postController.updatePostController);
router.delete("/delete-post/:id", postController.deletePostController);
router.put("/like-post/:id", postController.likeAndDislikeController);

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
