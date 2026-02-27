import { useState, useEffect } from "react";
import TokenContext from "./tokenContext";

function TokenProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("token") || null);
  const [name, setName] = useState(() => localStorage.getItem("name") || null);
  const [playerId, setPlayerId] = useState(() => localStorage.getItem("playerId") || null);
  const [roomId, setRoomId] = useState(() => localStorage.getItem("roomId") || null);
  const [code, setCode] = useState(() => localStorage.getItem("code") || null);
  const [isHost, setIsHost] = useState(() => localStorage.getItem("isHost") || null);

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

  useEffect(() => {
    if (code) localStorage.setItem("code", code);
  }, [code]);


  useEffect(() => {
    if (isHost !== null) localStorage.setItem("isHost", isHost);
  }, [isHost]);



  return (
    <TokenContext.Provider
      value={{ token, setToken, name, setName, playerId, setPlayerId, roomId, setRoomId, code, setCode, isHost, setIsHost, }}
    >
      {children}
    </TokenContext.Provider>
  );
}

export default TokenProvider;