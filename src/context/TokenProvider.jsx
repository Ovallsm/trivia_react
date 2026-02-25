import { useState, useEffect } from "react";
import TokenContext from "./tokenContext";

function TokenProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("token") || null);
  const [name, setName] = useState(() => localStorage.getItem("name") || null);
  const [playerId, setPlayerId] = useState(() => localStorage.getItem("playerId") || null);
  const [roomId, setRoomId] = useState(() => localStorage.getItem("roomId") || null);

  useEffect(() => {
    if (token) localStorage.setItem("token", token);
  }, [token]);

  useEffect(() => {
    if (name) localStorage.setItem("name", name);
  }, [name]);

  useEffect(() => {
    if (playerId) localStorage.setItem("playerId", playerId);
  }, [playerId]);

  useEffect(() => {
    if (roomId) localStorage.setItem("roomId", roomId);
  }, [roomId]);

  return (
    <TokenContext.Provider
      value={{ token, setToken, name, setName, playerId, setPlayerId, roomId, setRoomId }}
    >
      {children}
    </TokenContext.Provider>
  );
}

export default TokenProvider;