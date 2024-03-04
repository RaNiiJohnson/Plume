const UserModel = require("../models/user.model");

module.exports.getUserController = async (userId) => {
  try {
    const user = await UserModel.findById(userId).select("-password");
    return user;
  } catch (err) {
    throw err;
  }
};

module.exports.getAllUserController = async (req, res) => {
  try {
    const user = await UserModel.find()
      .sort({ createdAt: -1 })
      .select("-password");
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "user fetch failed",
      err,
    });
  }
};
