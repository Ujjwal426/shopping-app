import jwt from "jsonwebtoken";
import "dotenv/config";

export const generateToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET_KEY, {
    expiresIn: "15d",
  });
};
