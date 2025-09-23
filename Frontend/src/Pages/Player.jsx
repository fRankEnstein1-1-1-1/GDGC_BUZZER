// Player.jsx

import { useState } from "react";
import "./Player.css";

export default function Player() {
  const [team, setTeam] = useState("");
  const [joined, setJoined] = useState(false);
  const [presses, setPresses] = useState([]);

  const buzz = () => {
    const sound = new Audio("/buzzer.mp3");
    sound.play();

    const now = new Date();

    // Format: DD/MM/YYYY HH:MM:SS.ms
    //const date = now.toLocaleDateString("en-GB"); 
    const time =
      now.toLocaleTimeString("en-GB", { hour12: false }) +
      "." +
      now.getMilliseconds().toString().padStart(3, "0");

    const formatted = `${time}`;

    setPresses((prev) => [...prev, { team, time: formatted }]);
  };

  const handleJoin = () => {
    if (team.trim() === "") return;
    setJoined(true);
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
        ) : (
          <div className="flex flex-col items-center">
            <button className="player-buzz-btn" onClick={buzz}>
              BUZZ!
            </button>

            {presses.length > 0 && (
              <div className="press-log">
                <h3>Buzzer Press Log</h3>
                <ul>
                  {presses.map((p, idx) => (
                    <li key={idx}>
                      {p.team} — {p.time}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
