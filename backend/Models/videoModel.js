import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  video_id: {
    type: String,
    required: true,
    unique: true,
  },
  client_name: {
    type: String,
    required: true,
  },
  client_email: {
    type: String,
    required: true,
  },
  video_title: {
    type: String,
    required: true,
  },
  video_description: {
    type: String,
  },
  status: {
    type: String,
    default: "Script writing",
  },
  date_started: {
    type: String,
  },
  video_url: {
    type: String,
  },
  date_completed: {
    type: String,
  },
});

const VideoModel = mongoose.model("Video", videoSchema);

export default VideoModel;
