import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import postRoutes from "./routes/posts.js";
import userRoutes from "./routes/users.js";

// Initialize app
const app = express();
dotenv.config();

// For sending requests
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

// Routes and Middleware
app.use("/posts", postRoutes); // Each route starts with /posts/route
app.use("/users", userRoutes);

app.get("/", (req, res) => {
  res.send("Hello to Memories API");
});

// Connect to DB
const PORT = process.env.PORT || 5001;

mongoose
  .connect(process.env.CONNECTION_URL)
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
  )
  .catch((err) => console.error("Error connecting to database:", err.message));
