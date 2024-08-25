import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import router from "./Routes/routes.js";

dotenv.config(); // Load environment variables from .env file

const app = express(); // Initializes Express application

app.use(cors()); // Enables Cross-Origin Resource Sharing (CORS)
app.use(express.json()); // Parses incoming JSON requests
app.use(express.urlencoded({ extended: true })); // Parses URL-encoded data

const PORT = process.env.PORT || 8001; // Defines port on which server will listen

// Connect to MongoDB using URI from environment variables
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:")); // Handle connection errors
db.once("open", () => {
  console.log("Connected to MongoDB"); // Confirm successful connection
});

app.use("/backend/", router); // Set up routes under /backend/ path

// Define basic route for testing server
app.get("/backend", (req, res) => {
  res.send("Hello World");
});

// Starts server and listen on specified port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app; // Exports Express app for potential use in other modules
