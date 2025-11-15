export default function ForestSelector({ forest, setForest }) {
    // Match exact forest names from backend
    const forests = [
      "Karura Forest",
      "Kakamega Forest",
      "Mau Forest Complex",
      "Aberdare Forest",
      "Mount Kenya Forest",
      "Mount Elgon Forest",
      "Arabuko-Sokoke Forest",
      "Shimba Hills",
      "Ngong Hills (Ngong Forest)",
      "Ngare Ndare Forest",
      "Loita Forest",
      "Cherangani Hills Forest",
      "Nandi Forests",
      "Kereita Forest",
      "Eburu Forest",
      "Ololua Forest",
      "Kaya Kinondo",
      "Menengai Forest"
    ];
  
    return (
      <select value={forest} onChange={e => setForest(e.target.value)} style={styles.select}>
        <option value="">Select a forest</option>
        {forests.map((f, i) => (
          <option key={i} value={f}>{f}</option>
        ))}
      </select>
    );
  }
  
  const styles = {
    select: {
      padding: "10px",
      width: "100%",
      borderRadius: "5px",
      border: "1px solid #ccc",
      marginBottom: "10px"
    }
  };