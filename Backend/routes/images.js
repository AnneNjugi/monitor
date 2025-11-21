import express from "express";
import mongoose from "mongoose";
import { fetchSentinelImage } from "../services/sentinelHubService.js";
import { validateGibsRequest, getValidForests } from "../utils/validation.js";

const router = express.Router();

router.get("/forests", (_req, res) => {
  res.json({
    forests: getValidForests(),
    count: getValidForests().length
  });
});

router.get("/gibs", validateGibsRequest, async (req, res) => {
  try {
    const { forest, date } = req.query;
    console.log(`Fetching image for ${forest} on ${date}`);
    
    const imgBuffer = await fetchSentinelImage(forest, date);
    if (!imgBuffer) {
      console.log("No image buffer returned");
      return res.status(404).json({ 
        error: "No image found for the specified forest and date"
      });
    }
    
    // Check if it's SVG (placeholder) or JPEG (real image)
    const isSvg = imgBuffer.toString('utf8', 0, 5) === '<?xml' || imgBuffer.toString('utf8', 0, 4) === '<svg';
    console.log(`Returning ${isSvg ? 'SVG placeholder' : 'JPEG image'}`);
    
    res.setHeader("Content-Type", isSvg ? "image/svg+xml" : "image/jpeg");
    res.send(imgBuffer);
  } catch (err) {
    console.error("Error in /gibs route:", err);
    res.status(500).json({ error: "Server error", details: err.message });
  }
});

// Health check endpoint
router.get("/health", (_req, res) => {
  res.json({ 
    status: "ok", 
    timestamp: new Date().toISOString(),
    database: mongoose.connection.readyState === 1 ? "connected" : "disconnected"
  });
});

export default router;