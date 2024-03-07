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
    const user = await UserModel.signUp(pseudo, password);
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge });
    res.status(200).json({
      id: user._id,
      pseudo: user.pseudo,
      picture: user.picture,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};

module.exports.signIn = async (req, res) => {
  const { pseudo, password } = req.body;

  try {
    const user = await UserModel.signIn(pseudo, password);
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge });
    res.status(200).json({
      id: user._id,
      pseudo: user.pseudo,
      picture: user.picture,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};

module.exports.logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 1 });
    res.redirect("/");
  } catch (error) {
    res.status(400).json({ error });
  }
};
