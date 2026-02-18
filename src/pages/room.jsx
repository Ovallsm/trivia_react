import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useContext } from "react";
import NavRoom from "../assets/NavRoom";
import TokenContext from "../context/tokenContext";
import PlayerBox from "../assets/playerbox";
import FetchSSeServer from "../scripts/fetchRoom";
import "../styles/room.css";

export default function Room() {
  const [username, setUsername] = useState("");
  const [players, setPlayers] = useState([{}]);
  var roomid = 0;
  const { token, setToken } = useContext(TokenContext);

  const eventSource = useRef(null);

  useEffect(() => {
    var name = localStorage.getItem("username");
    var id = localStorage.getItem("id");
    roomid = localStorage.getItem("roomid");
    setUsername(name);
    setToken(localStorage.getItem("token"));
    const newPlayers = [{ name: name, id: id }];
    setPlayers(newPlayers);

    if (eventSource.current === null) {
      eventSource.current =  FetchSSeServer(roomid, token);

      eventSource.current.addEventListener("player-left", (event) => {
        setPlayers(players.filter((player) => player.id != event.data));
      });

      eventSource.current.addEventListener("player-joined", async (event) => {
        const player = await fetchPlayer(event.data);
        setPlayers([...players, player]);
      });
    }
  }, []);

  return (
    <>
      <NavRoom roomCode={localStorage.getItem("joinURL")} username={username} />
      <PlayerBox players={players} />
    </>
  );
}
