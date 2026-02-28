import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useContext } from "react";
import NavRoom from "../assets/NavRoom";
import TokenContext from "../context/tokenContext";
import FetchSSeServer from "../scripts/fetchRoom";
import {
  getRoomPlayers,
  fetchNewPLayer,
  getRoomsTeams,
} from "../scripts/fetchRoom";
import "../styles/room.css";
import TeamZone from "../assets/TeamZone";
import GameOptions from "../assets/GameOptions";

export default function Room() {
  const [players, setPlayers] = useState([]);

  const navigate = useNavigate();
  const [teams, setTeams] = useState([]);
  const [joinURL, setJoinURL] = useState("");
  const {
    token,
    setToken,
    name,
    setName,
    playerId,
    setPlayerId,
    roomId,
    setRoomId,
    code,
    setCode,
    isHost,
  } = useContext(TokenContext);

  const eventSource = useRef(null);

  useEffect(() => {
    getRoomsTeams(roomId, token).then((teams) => {
      setTeams(teams);
    });
    setJoinURL(generateJoinURL(roomId, code));

    const fetchData = async () => {

      const fetchPlayers = await getRoomPlayers(roomId, token);



      setPlayers(fetchPlayers.map((player) => ({ name: player.name, id: player.id, team: player.team })));

    };
    fetchData();

    if (!eventSource.current) {
      eventSource.current = FetchSSeServer(roomId, token);

      eventSource.current.addEventListener("player-joined", async (event) => {
        console.log(event.data);
        const player = await fetchNewPLayer(event.data, token, roomId);
        setPlayers((prev) => [...prev, { name: player.name, id: player.id, team: player.team }]);
      });

      eventSource.current.addEventListener("player-left", (event) => {
        console.log("player left", event.data);
        setPlayers((prev) => prev.filter((player) => player.id != event.data));

        if (playerId == event.data) {
          setToken(null);
          setName(null);
          setPlayerId(null);
          setRoomId(null);
          setCode(null);
          navigate("/");

        }
      });

      eventSource.current.addEventListener("team-created", async (event) => {
        const updatedTeams = await getRoomsTeams(roomId, token);
        setTeams(updatedTeams);
      });
      eventSource.current.addEventListener("team-deleted", async (event) => {
        console.log("team deleted", event.data);
        const updatedTeams = await getRoomsTeams(roomId, token);
        setTeams(updatedTeams);
      });
      eventSource.current.addEventListener("player-assigned-to-team", async (event) => {
        const player = await fetchNewPLayer(event.data, token, roomId);
        console.log(player)
        setPlayers((prev) => prev.map((p) => (p.id == player.id ? player : p)));
      })
      eventSource.current.addEventListener("player-removed-from-team", async (event) => {
        const player = await fetchNewPLayer(event.data, token, roomId);
        setPlayers((prev) => prev.map((p) => (p.id == player.id ? player : p)));
      });

    }
  }, []);

  return (
    <>
      <NavRoom roomCode={joinURL} username={name} />
      <GameOptions />
      <TeamZone
        players={players}
        teams={teams}
        setTeams={setTeams}
        setPlayers={setPlayers}
      />
    </>
  );

  function generateJoinURL(roomId, code) {
    var param = new URL("http://localhost:5173/joinroom");
    param.searchParams.append("code", code);
    param.searchParams.append("id", roomId);

    return param.toString();
  }
}
