import express from "express";
import { register, login, logout, getProfile } from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

//* Registering new User
router.post("/register", register);

//* Login
router.post("/login", login);

//* Getting Profile
router.get("/me", isAuthenticated, getProfile);

//* Logout
router.get("/logout", logout);

export default router;