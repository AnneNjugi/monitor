import axios from "axios";
import sharp from "sharp";

// Predefined bboxes same as your Python version
const FOREST_BBOXES = {
  "Karura Forest": [36.75, -1.30, 36.90, -1.20],
  // ... add the rest
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
