export default function DateRangePicker({ startDate, endDate, setStartDate, setEndDate }) {
    return (
      <div style={styles.wrapper}>
        <div>
          <label>Start date:</label><br/>
          <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        </div>
  
        <div>
          <label>End date:</label><br/>
          <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        </div>
      </div>
    );
  }
  
  const styles = {
    wrapper: {
      display: "flex",
      gap: "20px",
      margin: "10px 0",
    }
  };
  