import multer, { diskStorage } from "multer";
import { createPost } from "../services/post.service";
import PostModel from "../models/post.model";

let filename;
const multerConfig = diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./uploads/pochettes/");
  },
  filename: async (req, file, callback) => {
    const ext = file.mimetype.split("/")[1];
    filename = `post-${req.body.artist}.${Date.now()}.${ext}`;
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

export const uploadImage = upload.single("photo");

const _upload = async (req, res) => {
  console.log(req.file);
  try {
    const { posterId, description, artist, title, lyrics } = req.body;
    const pochette = req.file
      ? process.env.BASE_URL + "pochettes/" + filename
      : undefined;
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
export { _upload as upload };
