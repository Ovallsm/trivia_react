import { Link } from "react-router-dom";
import { useState } from "react";
import "../styles/mainMenu.css";
import { createGame } from "./fetch.js";

export default function CreateGame() {
  const [username, setUsername] = useState("");

  const handleCreateGame = () => {
    createGame(username);
  };

  return (
    <div id="joinGameContainer">
      <input
        type="text"
        placeholder="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />

      <button onClick={handleCreateGame}>Create game</button>

      <Link to="/joingame">Join a Game?</Link>
    </div>
  );
}
