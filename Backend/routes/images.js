import express from "express";
import { fetchGibsImage } from "../services/gibsService.js";

const router = express.Router();

// GET /api/images/gibs?forest=Karura%20Forest&date=2024-05-01
router.get("/gibs", async (req, res) => {
  try {
    const { forest, date } = req.query;
    const imgBuffer = await fetchGibsImage(forest, date);
    if (!imgBuffer) return res.status(404).json({ error: "No image" });
    res.setHeader("Content-Type", "image/jpeg");
    res.send(imgBuffer);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
