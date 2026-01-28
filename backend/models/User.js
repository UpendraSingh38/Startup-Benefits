import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  verified: { type: Boolean, default: false }
});

userSchema.pre("save", async function () {
  this.password = bcrypt.hash(this.password, 10);
});

export default mongoose.model("User", userSchema);
