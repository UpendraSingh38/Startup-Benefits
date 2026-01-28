import mongoose from "mongoose";

export default mongoose.model("Deal", new mongoose.Schema({
  title: String,
  description: String,
  category: String,
  locked: Boolean,
  partner: String
}));
