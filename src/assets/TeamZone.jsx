import TeamBox from "./TeamBox";
import { useState, useContext } from "react";
import TokenContext from "../context/tokenContext";
import { createTeam } from "../scripts/fetchRoom";

export default function TeamZone({ players, teams, setTeams }) {
  const { token, roomId, isHost } = useContext(TokenContext);

  const addTeam = async () => {
    const team = await createTeam(token, roomId);
    console.log("created team", team);


    setTeams((prev) => [...prev, { id: team.id }]);
  };

  if (!isHost) {
    return (
      <>
        <h1>Spectate</h1>
        <div className="player-box">
          {players.map((player) =>
            player.team == null ? (
              <div key={player.id || Math.random()} className="player">
                {player.name}
              </div>
            ) : null,
          )}
        </div>

        <div className="team-zone">
          {teams
            .filter((t) => t && t.id != null)
            .map((team, index) => (
              <TeamBox key={team.id} team={team} players={players} index={index} />
            ))}
        </div>
      </>
    );
  }

  return (
    <>
      <h1>Spectate</h1>
      <div className="player-box">
        {players.map((player) =>
          player.team == null ? (
            <div key={player.id || Math.random()} className="player">
              {player.name}
            </div>
          ) : null,
        )}
      </div>
      <div className="team-zone">
        {teams
          .filter((t) => t && t.id != null)
          .map((team, index) => (
            <TeamBox key={team.id} team={team} players={players} index={index} />
          ))}      </div>

      <button onClick={addTeam}>Agregar Equipo</button>
    </>
  );
}
