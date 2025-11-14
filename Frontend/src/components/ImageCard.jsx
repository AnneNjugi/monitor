export default function ImageCard({ title, imgBase64 }) {
    return (
      <div style={{ borderRadius:12, boxShadow:"0 6px 20px rgba(0,0,0,0.08)", overflow:"hidden" }}>
        <h4 style={{padding:8, margin:0}}>{title}</h4>
        <img src={`data:image/jpeg;base64,${imgBase64}`} style={{ width:"100%", display:"block" }} />
      </div>
    );
  }
  