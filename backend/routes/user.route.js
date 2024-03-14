const router = require("express").Router();
import { signUp, signIn, logout } from "../controllers/auth.controller";
import { upload, uploadImage } from "../controllers/uploadProfil.user";
import {
  getAllUserController,
  getUserController,
} from "../controllers/user.controller";

//auth
router.post("/signUp", signUp);
router.post("/signIn", signIn);
router.get("/signOut", logout);

//user
router.get("/", getAllUserController);
router.get("/:id", getUserController);

//picture
router.post("/upload", uploadImage, upload);

export default router;
