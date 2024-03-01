require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const { checkUser, requireAuth } = require("./middleware/auth.middleware");
const routes = require("./routes/routes");

const app = express();

// middleware
app.use(helmet());
app.use(morgan("common"));
app.use(cors());
app.use(express.json());
app.use(cookieParser());

//jwt
app.get("*0", checkUser);
app.get("/jwtId", requireAuth, (req, res) => {
  res.status(200).send(res.locals.user._id);
});

// routes
app.use("/", routes);

mongoose.set("strictQuery", true);

mongoose
  .connect(`${process.env.URL}MERN_Project`)
  .then(
    app.listen(process.env.PORT, () => {
      console.log(`connected on port ${process.env.PORT}`);
    })
  )
  .catch((err) => {
    console.log(err);
  });
