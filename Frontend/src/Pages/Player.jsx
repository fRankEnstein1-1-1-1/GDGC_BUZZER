// Player.jsx

import { useState } from "react";
import { io } from "socket.io-client";

import "./Player.css";

export default function Player() {
  // Change the URL to your localhost and port (e.g., http://localhost:4000)
  const socket = io("http://localhost:4000", { 
    transports: ["websocket"], 
    withCredentials:true
});
  const [team, setTeam] = useState("");
  const [joined, setJoined] = useState(false);
  const [showVideo, setShowVideo] = useState(true);

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
      <div className="nav">
        <div className="logo">
          <img src="/gdgcl.jpg" alt="Logo" />
        </div>
        <div className="logotext">
          <h2>Player</h2>
        </div>
      </div>
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