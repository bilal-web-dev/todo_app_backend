import cookieParser from "cookie-parser";
import express from "express";
import userRouter from "./routes/user.js";
import taskRouter from "./routes/task.js";
import { config } from "dotenv";
import cors from "cors";
import { errorMiddleWare } from "./middlewares/error.js";

export const app = express();

config({
  path: "./database/config.env",
});

//* Using Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

//* Routes
app.use("/api/users", userRouter);
app.use("/api/task", taskRouter);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Welcome to the API",
  });
});

//* Using Error Middleware
app.use(errorMiddleWare);
