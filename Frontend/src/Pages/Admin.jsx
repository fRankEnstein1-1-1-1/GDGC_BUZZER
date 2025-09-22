import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import "./Admin.css"; // import styles

export default function Admin() {
 const socket = io("https://gdgc-buzzer.onrender.com", {
  transports: ["websocket"],
  withCredentials:true
});

  const [winner, setWinner] = useState("Waiting...");

  useEffect(() => {
    socket.on("winner", (team) => setWinner(`Winner: ${team}`));
    socket.on("reset", () => setWinner("Waiting..."));
  }, []);

  const reset = () => socket.emit("reset");

  return (
    <>
      {/* ✅ Navbar (same across pages) */}
      <div className="nav">
        <div className="logo">
          <img src="/gdgcl.jpg" alt="Logo" />
        </div>
        <div className="logotext">
          <h3>Admin</h3>
        </div>
      </div>

      {/* ✅ Admin page content */}
      <div className="admin-root">
        <h1 className="admin-winner">{winner}</h1>
        <button className="admin-reset-btn" onClick={reset}>
          Reset
        </button>
      </div>
    </>
  );
}
