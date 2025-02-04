import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/connectDB.js";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import { v2 as cloudinary } from "cloudinary";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

//CORS
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000", // Client URL or localhost
    credentials: true, // Allow cookies and credentials
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"], // Explicitly allow PUT method
  })
);

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

//middleware is a function which runs b/w the req and res;
app.use(express.json({ limit: "50mb" })); // To parse JSON data npmin the req.body // To parse JSON data in the req.body
app.use(express.urlencoded({ extended: true })); // To parse form data in the req.body
app.use(cookieParser()); //To use cookies

//Routes
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

app.listen(PORT, () => {
  connectDB();
  console.log(`sever started at http://localhost:${PORT}`);
});
