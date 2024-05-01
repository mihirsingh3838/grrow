import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import { config } from "dotenv";
import userRoutes from "./router/userRoutes.js";

config();

const app = express();

app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    credentials: true,
  })
);

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// for parsing the cookies
app.use(cookieParser());

// middleware dev dependency to see log of server
app.use(morgan("dev"));

app.use("/ping", (req, res) => {
  res.send("Pong");
});

// Routing for all user options
app.use("/api/v1/user", userRoutes);

app.all("*", (req, res) => {
  res.status(404).send("OOPS!! 404 PAGE NOT FOUND");
});

export default app;
