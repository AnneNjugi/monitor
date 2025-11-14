import axios from "axios";
const BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const fetchGibs = (forest, date) => axios.get(`${BASE}/api/images/gibs`, { params: { forest, date }, responseType: 'arraybuffer' });
export const runCompare = (payload) => axios.post(`${BASE}/api/analysis/compare`, payload);
