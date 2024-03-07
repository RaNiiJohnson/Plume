const multer = require("multer");
const UserModel = require("../models/user.model");

let filename;
const multerConfig = multer.diskStorage({
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

module.exports.uploadImage = upload.single("photo");

// module.exports.upload = async (req, res) => {
//   console.log(req.file);
//   await UserModel.findByIdAndUpdate(
//     { _id: req.body.id },
//     {
//       $set: {
//         picture: process.env.BASE_URL + "users/" + filename,
//       },
//     },
//     { new: true, upsert: true, setDefaultsOnInsert: true }
//   )
//     .then((docs) => {
//       res.status(200).json(docs);
//     })
//     .catch((err) => {
//       res.status(500).json({ error: err });
//     });
// };
module.exports.upload = async (req, res) => {
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
