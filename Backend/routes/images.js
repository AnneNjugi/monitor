import express from "express";
import mongoose from "mongoose";
import { fetchGibsImage } from "../services/gibsService.js";
import { validateGibsRequest, getValidForests } from "../utils/validation.js";

const router = express.Router();

router.get("/forests", (req, res) => {
  res.json({
    forests: getValidForests(),
    count: getValidForests().length
  });
});

router.get("/gibs", validateGibsRequest, async (req, res) => {
  try {
    const { forest, date } = req.query;
    const imgBuffer = await fetchGibsImage(forest, date);
    if (!imgBuffer) return res.status(404).json({ 
      error: "No image found for the specified forest and date"
    });
    res.setHeader("Content-Type", "image/jpeg");
    res.send(imgBuffer);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error", details: err.message });
  }
});

// Health check endpoint
router.get("/health", (req, res) => {
  res.json({ 
    status: "ok", 
    timestamp: new Date().toISOString(),
    database: mongoose.connection.readyState === 1 ? "connected" : "disconnected"
  });
});

export default router;