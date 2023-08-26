import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import { sendCookies } from "../utils/cookies.js";
import errorHandler from "../middlewares/error.js";

export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    let user = await User.findOne({ email });

    if (user) return next(new errorHandler("User already exists", 400));

    const hashedPassword = await bcrypt.hash(password, 10);

    user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    sendCookies(user, res, "User Created Successfully", 200);
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");

    if (!user) return next(new errorHandler("User does not exist", 400));

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) return next(new errorHandler("Incorrect password", 400));

    sendCookies(user, res, `Welcome Back! ${user.name}`, 200);
  } catch (error) {
    next(error);
  }
};

export const getProfile = (req, res) => {
  res.json({
    success: true,
    user: req.user,
  });
};

export const logout = (req, res, next) => {
  const { token } = req.cookies;

  if (!token) return next(new errorHandler("User is not logged in", 400));

  res.status(200).clearCookie("token").json({
    success: true,
    message: "Logged out successfully",
    user: req.user,
  });
};
