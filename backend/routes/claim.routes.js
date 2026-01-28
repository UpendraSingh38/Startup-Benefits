import express from "express";
import Claim from "../models/Claim.js";
import Deal from "../models/Deal.js";
import User from "../models/User.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.post("/:dealId", auth, async (req, res) => {
  try {
    const deal = await Deal.findById(req.params.dealId);
    if (!deal) {
      return res.status(404).json({ error: "Deal not found" });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (deal.locked && !user.verified) {
      return res.status(403).json({ error: "Verification required" });
    }

    const claim = await Claim.create({ user, deal });
    res.json(claim);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const claims = await Claim.find({ user: req.user.id }).populate("deal");
    res.json(claims);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
