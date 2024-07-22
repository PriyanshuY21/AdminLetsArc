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

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/auth", auth, authenticated);
router.post("/create-user", createUser);

router.post("/create-video", createVideo);
router.get("/get-videos", auth, getVideos);
router.get("/get-all-videos", getAllVideos);
router.patch("/update-video", updateVideo);
router.patch("/update-video-status", updateVideoStatus);
router.delete("/delete-video", auth, deleteVideo);

export default router;
