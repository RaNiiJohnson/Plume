const multer = require("multer");
const { createPost } = require("../services/post.service");

let filename;
const multerConfig = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./uploads/posts/");
  },
  filename: async (req, file, callback) => {
    const ext = file.mimetype.split("/")[1];
    filename = `post-${req.body.title}.${Date.now()}.${ext}`;
    callback(null, filename);
  },
});

const isImage = (req, file, callback) => {
  if (file.mimetype.startsWith("image")) {
    callback(null, true);
  } else {
    callback(new Error("Veuillez uploader que des images"));
  }
};

const upload = multer({
  storage: multerConfig,
  fileFilter: isImage,
});

module.exports.uploadImage = upload.single("photo");

module.exports.upload = async (req, res) => {
  console.log(req.file);
  try {
    const { posterId, description, artist, title, lyrics } = req.body;
    const pochette = "/uploads/posts/" + filename;
    console.log(posterId);
    const post = await createPost({
      posterId,
      description,
      artist,
      title,
      lyrics,
      pochette,
    });
    res.status(200).json(post);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
