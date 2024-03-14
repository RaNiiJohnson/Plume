import multer, { diskStorage } from "multer";
import PostModel from "../models/post.model";

let filename;
const multerConfig = diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./uploads/pochettes/");
  },
  filename: async (req, file, callback) => {
    const ext = file.mimetype.split("/")[1];
    filename = `post-${req.body.id}.${Date.now()}.${ext}`;
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
  const pictureUrl = process.env.BASE_URL + "pochettes/" + filename;

  try {
    const updatedPochette = await PostModel.findByIdAndUpdate(
      { _id: req.body.id },
      {
        $set: {
          pochette: pictureUrl,
        },
      },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    res.status(200).json(updatedPochette);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export { _upload as upload };
