import { useState } from "react";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";
import "./Player.css";

export default function Player() {
  const socket = io("https://buzzer-backend.onrender.com", {
  transports: ["websocket"], // ensures reliable connection
});
  const [team, setTeam] = useState("");
  const [joined, setJoined] = useState(false);
  const [showVideo, setShowVideo] = useState(true); // new state

  const buzz = () => {
    const sound = new Audio("/buzzer.mp3");
    sound.play();
    socket.emit("buzz", team);
  };

  const handleJoin = () => {
    setJoined(true);
    setShowVideo(true); 
  };

  return (
    <>
      {/* ✅ Navbar (same style as Landing) */}
      <div className="nav">
        <div className="logo">
          <img src="/gdgcl.jpg" alt="Logo" />
        </div>
        <div className="logotext">
          <h2>Player</h2>
        </div>
      </div>

      {/* ✅ Player Page Content */}
      <div className="player-root">
      {!joined ? (
  <div className="w-full max-w-sm flex flex-col items-center">
    <input
      className="player-input"
      placeholder="Enter team name"
      value={team}
      onChange={(e) => setTeam(e.target.value)}
      required
    />
    <button className="player-join-btn" onClick={handleJoin}>
      Join
    </button>
  </div>
) : showVideo ? (
  <>
    <h2 className="video-title-top">Smash your buzzer like this:</h2>
    <video
      className="fullscreen-video"
      autoPlay
      onEnded={() => setShowVideo(false)}
    >
      <source src="/intro.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  </>
) : (
  <div className="flex flex-col items-center">
    <button className="player-buzz-btn" onClick={buzz}>
      BUZZ!
    </button>
  </div>
)}

      </div>
    </>
  );
}
