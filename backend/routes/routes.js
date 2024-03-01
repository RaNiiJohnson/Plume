const router = require("express").Router();
const userRoutes = require("./user.route");
const postRoutes = require("./post.route");

router.use("/api/users", userRoutes);
router.use("/api/posts", postRoutes);

module.exports = router;
