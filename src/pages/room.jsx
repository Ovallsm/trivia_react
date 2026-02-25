import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useContext } from "react";
import NavRoom from "../assets/NavRoom";
import TokenContext from "../context/tokenContext";
import PlayerBox from "../assets/playerbox";
import FetchSSeServer from "../scripts/fetchRoom";
import { getRoomPlayers } from "../scripts/fetchRoom"
import "../styles/room.css";

export default function Room() {
  const [players, setPlayers] = useState([{}]);
  const { token, setToken, name, setName, playerId, setPlayerId, roomId, setRoomId } = useContext(TokenContext);

  const eventSource = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      setPlayers([{ name: name, id: playerId }]);

      var fetchPlayers = await getRoomPlayers(roomId, token);

      setPlayers([{ name: name, id: playerId }, ...fetchPlayers])
    };

    fetchData();

    
    if (!eventSource.current) {
      eventSource.current = FetchSSeServer(roomId, token);

      /*
      eventSource.current.addEventListener("player-left", (event) => {
        setPlayers(prev =>
          prev.filter(player => player.id !== event.data)
        );
      });

      eventSource.current.addEventListener("player-joined", async (event) => {
        const player = await fetchPlayer(event.data);
        setPlayers(prev => [...prev, player]);
      });
      */
    }
    
  }, []);

  return (
    <>
      <NavRoom roomCode={localStorage.getItem("joinURL")} username={name} />
      <PlayerBox players={players} />
    </>
  );
}
