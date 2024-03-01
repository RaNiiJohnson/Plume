const UserModel = require("../models/user.model");
const jwt = require("jsonwebtoken");

const maxAge = 3 * 24 * 60 * 60 * 1000;

const createToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET, {
    expiresIn: maxAge,
  });
};

module.exports.signUp = async (req, res) => {
  const { pseudo, password } = req.body;

  try {
    const user = await UserModel.create({ pseudo, password });
    res.status(200).json({ user: user._id });
  } catch (error) {
    console.log(error);
  }
};

module.exports.signIn = async (req, res) => {
  const { pseudo, password } = req.body;

  try {
    const user = await UserModel.login(pseudo, password);
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge });
    res.status(200).json({ user: user._id });
  } catch (error) {
    console.log(error);
  }
};

module.exports.logout = (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/");
};
