import multer, { diskStorage } from "multer";
import UserModel from "../models/user.model";

let filename;
const multerConfig = diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./uploads/users/");
  },
  filename: async (req, file, callback) => {
    const ext = file.mimetype.split("/")[1];
    filename = `post-.${Date.now()}.${ext}`;
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
  const pictureUrl = process.env.BASE_URL + "users/" + filename;

  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      { _id: req.body.id },
      {
        $set: {
          picture: pictureUrl,
        },
      },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export { _upload as upload };
