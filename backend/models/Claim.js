import mongoose from "mongoose";

export default mongoose.model("Claim", new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  deal: { type: mongoose.Schema.Types.ObjectId, ref: "Deal" },
  status: { type: String, default: "pending" }
}));
