export default function Navbar({ setPage }) {
    return (
      <nav style={styles.nav}>
        <h2 style={styles.logo}>Forest Monitor</h2>
  
        <div style={styles.links}>
          <button onClick={() => setPage("home")} style={styles.btn}>Home</button>
          <button onClick={() => setPage("analysis")} style={styles.btn}>Analysis</button>
        </div>
      </nav>
    );
  }
  
  const styles = {
    nav: {
      width: "100%",
      padding: "15px 20px",
      display: "flex",
      justifyContent: "space-between",
      background: "#1b4332",
      color: "white",
      alignItems: "center",
    },
    links: { display: "flex", gap: "15px" },
    logo: { margin: 0 },
    btn: {
      padding: "8px 14px",
      border: "none",
      cursor: "pointer",
      background: "#40916c",
      color: "white",
      borderRadius: "6px",
    }
  };
  