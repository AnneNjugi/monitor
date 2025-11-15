import { useState } from "react";
import { runCompare } from "../api/api";
import ForestSelector from "../components/ForestSelector";
import DateRangePicker from "../components/DateRangePicker";

export default function Analysis() {
  const [forest, setForest] = useState("");
  const [beforeDate, setBeforeDate] = useState("");
  const [afterDate, setAfterDate] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const analyze = async () => {
    if (!forest || !beforeDate || !afterDate) {
      setError("Please select a forest and both dates");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const res = await runCompare({ forest, beforeDate, afterDate });
      setResult(res.data);
    } catch (err) {
      setError(err.response?.data?.error || err.message || "Analysis failed");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Forest Change Analysis</h2>

      <ForestSelector forest={forest} setForest={setForest} />

      <div style={{ marginTop: "20px" }}>
        <label>Before Date:</label>
        <input 
          type="date" 
          value={beforeDate} 
          onChange={(e) => setBeforeDate(e.target.value)}
          style={input}
        />
      </div>

      <div style={{ marginTop: "10px" }}>
        <label>After Date:</label>
        <input 
          type="date" 
          value={afterDate} 
          onChange={(e) => setAfterDate(e.target.value)}
          style={input}
        />
      </div>

      <button onClick={analyze} disabled={loading} style={btn}>
        {loading ? "Analyzing..." : "Run Analysis"}
      </button>

      {error && <div style={{ color: "red", marginTop: "10px" }}>{error}</div>}

      {result && (
        <div style={output}>
          <h3>Analysis Results</h3>
          <p><strong>Forest Loss:</strong> {result.lossPct?.toFixed(2)}%</p>
          
          {result.changeMap && (
            <div>
              <h4>Change Map:</h4>
              <img 
                src={`data:image/png;base64,${result.changeMap}`} 
                alt="Change map"
                style={{ maxWidth: "100%", marginTop: "10px" }}
              />
            </div>
          )}

          {result.before && (
            <div style={{ marginTop: "20px" }}>
              <h4>Before:</h4>
              <img 
                src={`data:image/jpeg;base64,${result.before}`} 
                alt="Before"
                style={{ maxWidth: "100%", marginTop: "10px" }}
              />
            </div>
          )}

          {result.after && (
            <div style={{ marginTop: "20px" }}>
              <h4>After:</h4>
              <img 
                src={`data:image/jpeg;base64,${result.after}`} 
                alt="After"
                style={{ maxWidth: "100%", marginTop: "10px" }}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

const input = {
  width: "100%",
  padding: "10px",
  marginTop: "5px",
  borderRadius: "5px",
  border: "1px solid #ccc",
};

const btn = {
  padding: "10px 20px",
  marginTop: "15px",
  border: "none",
  background: "#1b4332",
  color: "white",
  borderRadius: "6px",
  cursor: "pointer",
};

const output = {
  marginTop: "20px",
  background: "#f1f1f1",
  padding: "20px",
  borderRadius: "8px",
};