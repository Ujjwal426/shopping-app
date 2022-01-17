import jwt from "jsonwebtoken";
import User from "../models/User.js";
import statusCode from "../Constants/HttpStatusCode.js";

export const protect = async (req, res, next) => {
  let decode = null;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  )
    try {
      const token = req.headers.authorization.split(" ")[1];
      decode = jwt.verify(token, process.env.SECRET_KEY);
      req.user = await User.findById(decode.id).select("-password");
      next();
    } catch (err) {
      console.log(err.message);
    }
  if (!decode) {
    res.status(statusCode.UNAUTHORIZED).send({
      message: `Unathorized`,
    });
  }
};
