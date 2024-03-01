const UserModel = require("../models/user.model");

module.exports.getUser = async (userId) => {
  try {
    const user = await UserModel.findById(userId);
    return user;
  } catch (err) {
    throw err;
  }
};
