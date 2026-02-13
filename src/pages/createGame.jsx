import { Link } from "react-router-dom";
import { useState } from "react";
import "../styles/mainMenu.css";
import { createGame } from "./fetch.js";
import { useNavigate } from "react-router-dom";

export default function CreateGame() {
  const [username, setUsername] = useState("");
  const [error, setError] = useState(false); 
  const navigate = useNavigate();

  const handleCreateGame = async () => {
    if (username !== "") {
      try {
        await createGame(username);
        navigate("/room");
      } catch (error) {
        console.error(error);
      }
    } else {
   
      setError(true);
      setTimeout(() => setError(false), 500);
    }
  };

  return (
    <div id="joinGameContainer">
      <input
        type="text"
        placeholder="username"
        className={error ? "inputError" : ""} 
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />

      <button onClick={handleCreateGame} className="buttonStyle">
        Create game
      </button>
    </div>
  );
}
