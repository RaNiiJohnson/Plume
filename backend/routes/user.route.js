const router = require("express").Router();
const authController = require("../controllers/auth.controller");
const userController = require("../controllers/user.controller");

//auth
router.post("/register", authController.signUp);
router.post("/login", authController.signIn);
router.post("/logout", authController.logout);

//user
router.get("/", userController.getAllUserController);
router.get("/:id", userController.getUserController);

module.exports = router;
