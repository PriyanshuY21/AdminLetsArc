import express from "express";
import { auth } from "../Middleware/index.js"; 
import {
  register,
  login,
  authenticated,
  createUser,
} from "../Services/Auth.js"; 

import {
  createVideo,
  deleteVideo,
  getAllVideos,
  getVideos,
  updateVideo,
  updateVideoStatus,
} from "../Services/video.js"; 

const router = express.Router(); // Initializes Express router

// Authentication routes
router.post("/register", register); // Route for user registration
router.post("/login", login); // Route for user login
router.get("/auth", auth, authenticated); // Route to check if user is authenticated (protected by `auth` middleware)
router.post("/create-user", createUser); // Route to create new user

// Video management routes
router.post("/create-video", createVideo); // Route to create new video
router.get("/get-videos", auth, getVideos); // Route to get videos (protected by `auth` middleware)
router.get("/get-all-videos", getAllVideos); // Route to get all videos without authentication
router.patch("/update-video", updateVideo); // Route to update existing video
router.patch("/update-video-status", updateVideoStatus); // Route to update status of a video
router.delete("/delete-video", auth, deleteVideo); // Route to delete video (protected by `auth` middleware)

export default router; 