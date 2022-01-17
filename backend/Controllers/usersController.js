import User from "../models/User.js";
import statusCode from "../Constants/HttpStatusCode.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../Utils/generateToken.js";

export const authController = async (req, res) => {
  try {
    const password = req.body.password;
    const findUser = await User.findOne({ email: req.body.email });
    if (!findUser) {
      return res
        .status(statusCode.BAD_REQUEST)
        .send(`Invalid email and passowrd`);
    }
    const isMatch = await bcrypt.compare(password, findUser.password);
    if (isMatch) {
      res.status(statusCode.OK).json({
        _id: findUser._id,
        name: findUser.name,
        email: findUser.email,
        phone: findUser.phone,
        isAdmin: findUser.isAdmin,
        token: generateToken(findUser._id),
      });
    } else {
      return res
        .status(statusCode.BAD_REQUEST)
        .send(`Invalid email and passowrd`);
    }
  } catch (err) {
    res.status(statusCode.INTERNAL_SERVER).send(err.message);
  }
};

export const registerUser = async (req, res) => {
  try {
    const { name, email, password, phone, confirmpassword } = req.body;
    const findEmail = await User.findOne({ email });
    const findPhone = await User.findOne({ phone });
    if (findEmail) {
      return res.status(statusCode.BAD_REQUEST).send(`Mail already Exist`);
    }
    if (findPhone) {
      return res.status(statusCode.BAD_REQUEST).send(`Phone No already Exist`);
    }
    const user = new User({ name, email, password, phone });
    const register = await user.save();
    res.status(statusCode.OK).send({
      _id: register._id,
      name: register.name,
      email: register.email,
      phone: register.phone,
      isAdmin: register.isAdmin,
      token: generateToken(register._id),
    });
  } catch (err) {
    res.status(statusCode.INTERNAL_SERVER).send(err.message);
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (user) {
      res.status(statusCode.OK).send(user);
    } else {
      res.status(statusCode.NOT_FOUND).send("User Not Found");
    }
  } catch (err) {
    res.status(statusCode.INTERNAL_SERVER).send(err.message);
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const _id = req.user.id;
    const user = await User.findById(_id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.phone = req.body.phone || user.phone;
      if (req.body.password) {
        user.password = req.body.password;
      }
      const updateUser = await user.save();
      res.json({
        _id: updateUser._id,
        name: updateUser.name,
        email: updateUser.email,
        phone: updateUser.phone,
        isAdmin: updateUser.isAdmin,
        token: generateToken(updateUser._id),
      });
    } else {
      res.status(statusCode.NOT_FOUND);
      throw new Error("user not found");
    }
  } catch (err) {
    res.status(statusCode.INTERNAL_SERVER);
    throw new Error(err.message);
  }
};
