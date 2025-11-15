import { useState } from "react";
import Home from "./pages/Home";  // ← Change to lowercase
import Analysis from "./pages/Analysis";
import Navbar from "./components/Navbar";

export default function App() {
  const [page, setPage] = useState("home");

  return (
    <div>
      <Navbar setPage={setPage} />

      {page === "home" && <Home />}
      {page === "analysis" && <Analysis />}
    </div>
  );
}