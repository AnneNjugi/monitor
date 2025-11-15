import axios from "axios";

const BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

// Fetch GIBS image for a specific forest and date
export const fetchGibs = (forest, date) => 
  axios.get(`${BASE}/api/images/gibs`, { 
    params: { forest, date }, 
    responseType: 'arraybuffer' 
  });

// Run image comparison (supports URLs or forest+dates)
// Define this BEFORE runAnalysis since runAnalysis uses it
export const runCompare = (payload) =>
  axios.post(`${BASE}/api/analysis/compare`, payload);

// Fetch multiple images (for Home page)
export const fetchImages = async (forest, startDate, endDate) => {
  if (!forest || !startDate || !endDate) {
    throw new Error("Forest, start date, and end date are required");
  }

  // Generate dates between start and end
  const dates = [];
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    dates.push(d.toISOString().split('T')[0]);
  }

  // Fetch images for each date
  const imagePromises = dates.map(async (date) => {
    try {
      const response = await fetchGibs(forest, date);
      const blob = new Blob([response.data], { type: 'image/jpeg' });
      const reader = new FileReader();
      return new Promise((resolve) => {
        reader.onloadend = () => {
          resolve({
            title: `${forest} - ${date}`,
            date: date,
            imgBase64: reader.result.split(',')[1] // Remove data:image/jpeg;base64, prefix
          });
        };
        reader.readAsDataURL(blob);
      });
    } catch (error) {
      console.error(`Failed to fetch image for ${date}:`, error);
      return null;
    }
  });

  const images = await Promise.all(imagePromises);
  return images.filter(img => img !== null);
};

// Run image comparison analysis (wrapper function)
export const runAnalysis = async (forest, beforeDate, afterDate) => {
  const response = await runCompare({ forest, beforeDate, afterDate });
  return response.data;
};