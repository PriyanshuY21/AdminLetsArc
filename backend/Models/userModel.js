import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  user_id: {
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
  client_phone_number: {
    type: String,
    required: true,
  },
  password: {
    type: String,
  },
  date_created: {
    type: Date,
    default: new Date().toISOString(),
  },
});

const UserModel = mongoose.model("User", userSchema);

export default UserModel;
