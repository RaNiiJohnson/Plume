import { verify } from "jsonwebtoken";
import { findById } from "../models/user.model";

export function checkUser(req, res, next) {
  const token = req.cookies.jwt;
  if (token) {
    verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
        res.cookie("jwt", "", { maxAge: 1 });
        next();
      } else {
        let user = await findById(decodedToken.id);
        res.locals.user = user;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
}

export function requireAuth(req, res, next) {
  const token = req.cookies.jwt;
  if (token) {
    verify(token, process.env.SECRET, async (err, decodedToken) => {
      if (err) {
        console.error(err);
        return res.status(200).json({ user: "no token" });
      } else {
        console.log(decodedToken.id);
        res.locals.user = decodedToken;
        next();
      }
    });
  } else {
    console.log("No token !");
    return res.status(200).json({ user: "no token" });
  }
}
