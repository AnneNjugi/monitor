import { useState } from "react";
import ForestSelector from "../components/ForestSelector";
import DateRangePicker from "../components/DateRangePicker";
import { fetchImages } from "../api/api";
import ImageCard from "../components/ImageCard";

export default function Home() {
  const [forest, setForest] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadImages = async () => {
    if (!forest || !startDate || !endDate) {
      setError("Please select a forest and date range");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const data = await fetchImages(forest, startDate, endDate);
      setImages(data);
    } catch (err) {
      setError(err.message || "Failed to load images");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Satellite Images</h2>

      <ForestSelector forest={forest} setForest={setForest} />

      <DateRangePicker
        startDate={startDate}
        endDate={endDate}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
      />

      <button onClick={loadImages} disabled={loading} style={btn}>
        {loading ? "Loading..." : "Load Images"}
      </button>

      {error && <div style={{ color: "red", marginTop: "10px" }}>{error}</div>}

      <div style={gallery}>
        {images.map((img, i) => (
          <ImageCard key={i} title={img.title} imgBase64={img.imgBase64} />
        ))}
      </div>
    </div>
  );
}

const btn = {
  padding: "10px 20px",
  margin: "10px 0",
  border: "none",
  background: "#2d6a4f",
  color: "white",
  borderRadius: "6px",
  cursor: "pointer",
};

const gallery = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
  gap: "20px",
  marginTop: "20px",
};