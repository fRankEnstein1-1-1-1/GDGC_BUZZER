// Admin.jsx

import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import "./Admin.css"; // import styles

export default function Admin() {
  // Change the URL to your localhost and port (e.g., http://localhost:4000)
  const socket = io("https://gdgcbuzzer-production.up.railway.app", {
   transports:["polling"]
  });

  const [winner, setWinner] = useState("Waiting...");

  useEffect(() => {
    socket.on("winner", (team) => setWinner(`Winner: ${team}`));
    socket.on("reset", () => setWinner("Waiting..."));
  }, []);

  const reset = () => socket.emit("reset");

  return (
    <>
      <div className="nav">
        <div className="logo">
          <img src="/gdgcl.jpg" alt="Logo" />
        </div>
        <div className="logotext">
          <h3>Admin</h3>
        </div>
      </div>
      <div className="admin-root">
        <h1 className="admin-winner">{winner}</h1>
        <button className="admin-reset-btn" onClick={reset}>
          Reset
        </button>
      </div>
    </>
  );
}

