import TeamBox from "./TeamBox";
import { useState, useContext } from "react";
import TokenContext from "../context/tokenContext";
import { createTeam, quitTeam , removeFromMatch} from "../scripts/fetchRoom";

export default function TeamZone({ players, teams, setTeams, setPlayers }) {
  const { token, roomId, isHost, playerId } = useContext(TokenContext);

  const addTeam = async () => {
    const team = await createTeam(token, roomId);
  };

  const quitTeamPlayer = async () => {
    await quitTeam(
      players.find((p) => p.id == playerId)?.team,
      token,
      roomId,
      playerId,
    );

    setPlayers((prev) =>
      prev.map((player) =>
        player.id == playerId ? { ...player, team: null } : player,
      ),
    );
  };

  const EliminateSpectatorPlayer = async (playerIdToRemove) => {

    
    await removeFromMatch(playerIdToRemove, roomId,token);
  };

  return (
    <>
      <h1>Spectate</h1>

      <div className="player-box">
        {players
          .filter((player) => player.team == null)
          .map((player) => (
            <div key={player.id} className="player">
              {player.name}

              {isHost && player.id != playerId && (
                <button onClick={() => EliminateSpectatorPlayer(player.id)}>
                  X
                </button>
              )}
            </div>
          ))}

        <button onClick={quitTeamPlayer}>Spectate</button>
      </div>

      <div className="team-zone">
        {teams
          .filter((t) => t && t.id != null)
          .map((team, index) => (
            <TeamBox
              key={team.id}
              team={team}
              players={players}
              index={index}
              setPlayers={setPlayers}
              setTeams={setTeams}
            />
          ))}
      </div>

      {isHost && <button onClick={addTeam}>Agregar Equipo</button>}
    </>
  );
}
