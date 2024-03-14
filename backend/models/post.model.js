import { Schema, model } from "mongoose";

const postSchema = new Schema(
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
      default: process.env.BASE_URL + "pochettes/default-pochette.jpg",
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

const PostModel = model("post", postSchema);

export default PostModel;
