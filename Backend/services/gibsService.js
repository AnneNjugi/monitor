import axios from "axios";
import sharp from "sharp";

export const FOREST_BBOXES = {
  "Karura Forest": [36.81333, -1.25333, 36.85333, -1.21333],
  "Kakamega Forest": [34.80330, 0.19600, 34.92330, 0.31600],
  "Mau Forest Complex": [35.14800, -1.05000, 36.14800, -0.05000],
  "Aberdare Forest": [36.53250, -0.63000, 36.93250, -0.23000],
  "Mount Kenya Forest": [37.00840, -0.17500, 37.60840, 0.42500],
  "Mount Elgon Forest": [34.33300, 0.70800, 34.93300, 1.30800],
  "Arabuko-Sokoke Forest": [39.76670, -3.43333, 39.96670, -3.23333],
  "Shimba Hills": [39.30780, -4.33720, 39.46780, -4.17720],
  "Ngong Hills (Ngong Forest)": [36.66100, -1.40200, 36.76100, -1.30200],
  "Ngare Ndare Forest": [37.58300, 0.03300, 37.68300, 0.13300],
  "Loita Forest": [35.30000, -1.20000, 35.70000, -0.80000],
  "Cherangani Hills Forest": [34.70000, 0.20000, 35.30000, 0.80000],
  "Nandi Forests": [35.01670, 0.01670, 35.21670, 0.21670],
  "Kereita Forest": [36.67670, -1.14000, 36.75670, -1.06000],
  "Eburu Forest": [36.06670, -0.38330, 36.16670, -0.28330],
  "Ololua Forest": [36.70670, -1.32670, 36.72670, -1.30670],
  "Kaya Kinondo": [39.30000, -4.39000, 39.34000, -4.35000],
  "Menengai Forest": [35.23300, -0.13700, 35.33300, -0.03700]
};

export async function fetchGibsImage(forestName, dateStr, layer = "VIIRS_SNPP_CorrectedReflectance_TrueColor") {
  const bbox = FOREST_BBOXES[forestName];
  if (!bbox) throw new Error("Unknown forest");
  const [lon_min, lat_min, lon_max, lat_max] = bbox;

  // GIBS expects bbox lon_min,lat_min,lon_max,lat_max (EPSG:4326)
  const url = `https://gibs.earthdata.nasa.gov/wms/epsg4326/best/wms.cgi?service=WMS&request=GetMap&version=1.3.0&layers=${layer}&styles=&crs=EPSG:4326&bbox=${lon_min},${lat_min},${lon_max},${lat_max}&width=1024&height=1024&format=image/jpeg&time=${dateStr}&transparent=false`;

  const resp = await axios.get(url, { responseType: "arraybuffer", timeout: 30000 });
  if (resp.status !== 200) return null;

  // Optional: basic enhancement with sharp
  const buf = Buffer.from(resp.data);
  const enhanced = await sharp(buf)
    .modulate({ brightness: 1.05, saturation: 1.1 })
    .toFormat("jpeg")
    .toBuffer();
  return enhanced;
}
