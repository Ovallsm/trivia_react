import { useState, useEffect, useContext } from "react";
import { joinGameWithURL } from "../scripts/fetchJoinRoom";
import { useNavigate } from "react-router-dom";
import TokenContext from "../context/tokenContext";


export default function JoinGame() {
  const { token, setToken, setName, setPlayerId, setRoomId, setCode, setIsHost } = useContext(TokenContext);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const roomid = params.get("id");
    const roomcode = params.get("code");

    if (!roomid || !roomcode) {
      navigate("/");
    }
  }, [location, navigate]);

  const JoinGameWithName = async () => {
    if (username != "") {
      try {
        const gameData = await joinGameWithURL(username);
        setToken(gameData.token);
        setName(gameData.name);
        setPlayerId(gameData.playerId);
        setRoomId(gameData.roomId);
        setCode(gameData.code);
        setIsHost(gameData.isHost);
        navigate("/room");
      } catch (error) {
        navigate("/");
        console.error(error);
      }
    } else {
      setError(true);
      setTimeout(() => setError(false), 500);
    }
  };
  return (
    <>
      <input
        type="text"
        placeholder="username"
        value={username}
        className={error ? "inputError" : ""}
        onChange={(e) => setUsername(e.target.value)}
        required
      />

      <button onClick={JoinGameWithName} className="buttonStyle">
        Join Game
      </button>
    </>
  );
}
