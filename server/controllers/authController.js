import { nanoid } from "nanoid";
import Jwt from "jsonwebtoken";

import User from "../models/userModel.js";

let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

const profileImage = (user) => {

}

const generateUSername = async (email) => {
  let username = email.split("@")[0];

  let isUSernameAvilable = await User
    .exists({ username: username })
    .then((result) => result);

  isUSernameAvilable ? (username += nanoid().substring(0, 5)) : "";

  return username;
};

const signToken = (id) => {
  return Jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  res.status(statusCode).json({
    status: "success",
    token,
    data: formatedData(user),
  });
};

const formatedData = (user) => {
  return {
    profile_image: user.profile_img,
    username: user.username,
    fullname: user.fullname,
  };
};

export const signUp = async (req, res) => {
  const { fullname, email, password } = req.body;

  const username = await generateUSername(email);

  if (!passwordRegex.test(password)) {
    return res.status(403).json({
      error:
        "Password must be at least 6 characters long, contain at least one uppercase letter, one lowercase letter and one number",
    });
  }

  if (await User.findOne({ email: email }))
    return res.status(500).json({ error: "Email already exists" });

  const newUser = await User.create({
    fullname: fullname,
    email: email,
    password: password,
    username: username,
  });

  createSendToken(newUser, 201, res);
};

export const signin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      status: "Failed",
      message: "Please enter your email address and password",
    });
  }

  const user = await User.findOne({ email: email }).select("+password");

  if (!user || !(await user.correctPassword(password, user.password))) {
    res.status(401).json({
      status: "Failed",
      message: "Incorrect email or password",
    });
  }

  createSendToken(user, 200, res);
};
