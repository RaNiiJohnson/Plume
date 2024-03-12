const PostModel = require("../models/post.model");
module.exports.createPost = async (body) => {
  try {
    const newPost = new PostModel(body);

    await newPost.save();

    return newPost;
  } catch (error) {
    throw error;
  }
};

module.exports.updatePost = async (params, body) => {
  try {
    const updatedPost = await PostModel.findById(params.id);
    if (updatedPost.posterId === body.posterId) {
      await updatedPost.updateOne({
        $set: body,
      });
      return updatedPost;
    } else {
      throw new Error("You can update only your post");
    }
  } catch (error) {
    throw error;
  }
};

module.exports.deletePost = async (params, body) => {
  try {
    const deletedPost = await PostModel.findById(params.id);
    if (deletedPost.posterId === body.posterId) {
      await PostModel.deleteOne();
      return deletedPost;
    } else {
      throw new Error("You can delete only your post");
    }
  } catch (error) {
    throw error;
  }
};

module.exports.getPost = async (params) => {
  try {
    const post = await PostModel.findById(params.id);
    return post;
  } catch (error) {
    throw error;
  }
};

module.exports.getAllPost = async () => {
  try {
    const post = await PostModel.find().sort({ createdAt: -1 });
    return post;
  } catch (error) {
    throw error;
  }
};

module.exports.likeAndDislike = async (params, body) => {
  try {
    const post = await PostModel.findById(params.id);
    if (!post.likers.includes(body.posterId)) {
      await post.updateOne({ $push: { likers: body.posterId } });
    } else {
      await post.updateOne({ $pull: { likers: body.posterId } });
    }

    return post;
  } catch (error) {
    throw error;
  }
};

module.exports.commentPost = async (params, body) => {
  try {
    const post = await PostModel.findByIdAndUpdate(
      { _id: params.id },
      {
        $push: {
          comments: {
            commenterId: body.commenterId,
            commenterPseudo: body.name,
            text: body.text,
            timestamp: Date.now(),
          },
        },
      }
    );
    return post;
  } catch (error) {
    console.log(error);
  }
};

module.exports.editCommentPost = async (params, body) => {
  try {
    await PostModel.findByIdAndUpdate(
      { _id: params.id },
      {
        $pull: {
          comments: {
            text: body.text,
          },
        },
      },
      { new: true }
    )
      .then((docs) => {
        res.status(200).json(docs);
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
  } catch (error) {
    console.log(error);
  }
};

// module.exports.updatePost = async (params, body) => {
//   try {
//     const updatedPost = await PostModel.findById(params.id);
//     if (updatedPost.posterId === body.posterId) {
//       await PostModel.updateOne({
//         $set: {
//           post: req.body.post,
//         },
//       });
//       return updatedPost;
//     } else {
//       throw new Error("You can update only your post");
//     }
//   } catch (error) {
//     throw error;
//   }
// };
