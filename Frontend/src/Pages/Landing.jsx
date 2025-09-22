import { useNavigate } from "react-router-dom";
import './Landing.css';
import { useState } from "react";

export default function Landing() {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [showAdminInput, setShowAdminInput] = useState(false);

  const Start = () => {
    navigate('/player'); // normal users → player page
  };

  const handleValidate = () => {
    if (password === 'mrmenon') {
      navigate('/admin'); // core members → admin page
    } else {
      alert("Wrong password!");
    }
  };

  return (
    <div className="root">
      {/* Logo → triggers admin validation */}
      <div className="nav" onClick={() => setShowAdminInput(true)}>
        <div className="logo">
          <img src="/gdgcl.jpg" alt="Logo" />
        </div>
        <div className="logotext">
          <h3>Google Developer Groups on Campus</h3>
        </div>
      </div>

      {/* Admin input only shows if logo is clicked */}
      {showAdminInput && (
        <div className="w-full max-w-sm flex flex-col items-center">
          <input
            className="player-input"
            placeholder="Most Handsome Guy ?"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="player-join-btn" onClick={handleValidate}>
            Agree
          </button>
        </div>
      )}
      <div className="Start-btn">
        <div className="Str-btn">
          <h2 className="feud">Feud</h2>
        </div>
        <button onClick={Start} className="strtbtn">Start</button>
      </div>
    </div>
  );
}
