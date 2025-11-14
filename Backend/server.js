import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import imagesRouter from "./routes/images.js";
import analysisRouter from "./routes/analysis.js";

dotenv.config();

// 🔥 CONNECT TO MONGODB AT STARTUP
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// ROUTES
app.use("/api/images", imagesRouter);
app.use("/api/analysis", analysisRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
