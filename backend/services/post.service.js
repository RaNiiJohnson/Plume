import PostModel, {
  findById,
  deleteOne,
  find,
  findByIdAndUpdate,
} from "../models/post.model";
export async function createPost(body) {
  try {
    const newPost = new PostModel(body);

    await newPost.save();

    return newPost;
  } catch (error) {
    throw error;
  }
}

export async function updatePost(params, body) {
  try {
    const updatedPost = await findById(params.id);
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
}

export async function deletePost(params, body) {
  try {
    const deletedPost = await findById(params.id);
    if (deletedPost.posterId === body.posterId) {
      await deleteOne();
      return deletedPost;
    } else {
      throw new Error("You can delete only your post");
    }
  } catch (error) {
    throw error;
  }
}

export async function getPost(params) {
  try {
    const post = await findById(params.id);
    return post;
  } catch (error) {
    throw error;
  }
}

export async function getAllPost() {
  try {
    const post = await find().sort({ createdAt: -1 });
    return post;
  } catch (error) {
    throw error;
  }
}

export async function likeAndDislike(params, body) {
  try {
    const post = await findById(params.id);
    if (!post.likers.includes(body.posterId)) {
      await post.updateOne({ $push: { likers: body.posterId } });
    } else {
      await post.updateOne({ $pull: { likers: body.posterId } });
    }

    return post;
  } catch (error) {
    throw error;
  }
}

export async function commentPost(params, body) {
  try {
    const post = await findByIdAndUpdate(
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
}

export async function editCommentPost(params, body) {
  try {
    await findByIdAndUpdate(
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
}

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
