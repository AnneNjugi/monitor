import axios from "axios";

const BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

// Fetch GIBS image for a specific forest and date
export const fetchGibs = (forest, date) => 
  axios.get(`${BASE}/api/images/gibs`, { 
    params: { forest, date }, 
    responseType: 'arraybuffer' 
  });

// Run image comparison (supports URLs or forest+dates)
export const runCompare = (payload) =>
  axios.post(`${BASE}/api/analysis/compare`, payload);