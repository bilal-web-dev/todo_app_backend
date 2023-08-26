import express from "express";
import { create, deleteTask, getMyTasks, update } from "../controllers/task.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();


router.post("/create", isAuthenticated, create)

router.put("/update/:id",isAuthenticated, update)

router.delete("/delete/:id", isAuthenticated, deleteTask)

router.get("/all",isAuthenticated, getMyTasks)

export default router;
