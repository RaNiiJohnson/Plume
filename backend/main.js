import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import { connect, set } from "mongoose";
import morgan from "morgan";
import { checkUser, requireAuth } from "./middleware/auth.middleware";
import routes from "./routes/routes";
require("dotenv").config();
const app = express();

// middleware
app.use(cors({ origin: true }));
app.use(helmet());
app.use(morgan("common"));
app.use(json());
app.use(cookieParser());
app.use(express.static("uploads"));
app.get("/", (req, res) => {
  res.send("Hello World!");
});
//jwt
app.get("*", checkUser);
app.get("/jwtId", requireAuth, (req, res) => {
  res.status(200).send(res.locals.user.id);
});

// routes
app.use("/", routes);

set("strictQuery", true);

connect(`${process.env.URL}MERN_Project`)
  .then(
    app.listen(process.env.PORT, () => {
      console.log(`connected on port ${process.env.PORT}`);
    })
  )
  .catch((err) => {
    console.log(err);
  });
