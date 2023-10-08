import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Must be provide username"],
  },
  email: {
    type: String,
    required: [true, "Must be provide email"],
    unique: [true, "Email already exist!"],
  },
  mobile: {
    type: String,
    required: [true, "Must be provide mobile"],
  },
  password: {
    type: String,
    required: [true, "Must be provide password"],
  },
  otp: {
    type: String,
  },
  role_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Role",
  },
  admin_mail: {
    type: String,
  },
  is_verified: {
    type: Boolean,
  },
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);
export default User;
