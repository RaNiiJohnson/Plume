const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    posterId: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    artist: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    lyrics: {
      type: String,
      required: true,
    },
    pochette: {
      type: String,
    },
    likers: {
      type: [String],
      required: true,
    },
    comments: {
      type: [
        {
          commenterId: String,
          commenterPseudo: String,
          text: String,
          timestamp: Number,
        },
      ],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const PostModel = mongoose.model("post", postSchema);

module.exports = PostModel;
