const router = require("express").Router();
import userRoutes from "./user.route";
import postRoutes from "./post.route";

router.use("/api/users", userRoutes);
router.use("/api/posts", postRoutes);

export default router;
