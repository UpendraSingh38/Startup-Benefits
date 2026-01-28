import express from "express";
import Deal from "../models/Deal.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const deals = await Deal.find();
    res.json(deals);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({ error: "Deal ID is required" });
    }
    const deal = await Deal.findById(req.params.id);
    if (!deal) {
      return res.status(404).json({ error: "Deal not found" });
    }
    res.json(deal);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
