const bcrypt = require("bcrypt");
const UserModel = require("../models/user.model");
module.exports.updateUser = async (userId, updateData) => {
  if (updateData.password) {
    try {
      updateData.password = await bcrypt.hashSync(updateData.password, 10);
    } catch (err) {
      throw err;
    }
  }
  try {
    const user = await UserModel.findByIdAndUpdate(
      userId,
      {
        $set: updateData,
      },
      {
        new: true,
      }
    );
    return user;
  } catch (err) {
    throw err;
  }
};
module.exports.deleteUser = async (userId) => {
  try {
    await UserModel.findByIdAndDelete(userId);
  } catch (err) {
    throw err;
  }
};
module.exports.getUser = async (userId) => {
  try {
    const user = await UserModel.findById(userId);
    return user;
  } catch (err) {
    throw err;
  }
};
