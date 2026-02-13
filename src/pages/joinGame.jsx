import { useState, useEffect } from "react";
import { joinGameWithURL } from "./fetch";
import { useNavigate } from "react-router-dom";

export default function JoinGame() {
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
        await joinGameWithURL(username);
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
