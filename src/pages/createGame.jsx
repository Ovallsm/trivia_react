import { Link } from "react-router-dom";
import { useState } from "react";
import "../styles/mainMenu.css";
import { createGame } from "../scripts/fetchJoinRoom.js";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import TokenContext from "../context/tokenContext";

export default function CreateGame() {
  const {
    token,
    setToken,
    setName,
    setPlayerId,
    setRoomId,
    setCode,
    setIsHost,
  } = useContext(TokenContext);

  const [username, setUsername] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleCreateGame = async () => {
    if (username !== "") {
      localStorage.clear
      try {
        const gameData = await createGame(username);

        setToken(gameData.token);
        setName(gameData.name);
        setPlayerId(gameData.playerId);
        setRoomId(gameData.roomId);
        setCode(gameData.code);
        setIsHost(gameData.isHost);
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
      <Link to={"/history"}> Last game history</Link>
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
