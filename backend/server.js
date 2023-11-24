import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/connectDB.js";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js";
import postRoutes from './routes/postRoutes.js'

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

//middleware is a function which runs b/w the req and res;
app.use(express.json()); // To parse JSON data in the req.body
app.use(express.urlencoded({ extended: true })); // To parse form data in the req.body
app.use(cookieParser()); //To use cookies

//Routes
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

app.listen(PORT, () =>
  console.log(`sever started at http://localhost:${PORT}`)
);
