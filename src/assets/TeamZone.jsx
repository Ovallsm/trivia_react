import TeamBox from "./TeamBox";
import { useState, useContext } from "react";
import TokenContext from "../context/tokenContext";
import { createTeam, quitTeam, removeFromMatch } from "../scripts/fetchRoom";

export default function TeamZone({ players, teams, setTeams, setPlayers }) {
  const { token, roomId, isHost, playerId } = useContext(TokenContext);

  const addTeam = async () => {
    const team = await createTeam(token, roomId);
    setTeams((prev) => [...prev, team]);
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
    await removeFromMatch(playerIdToRemove, roomId, token);
  };

  return (
    <div className="room-layout">
      <div className="spectator-section">
        <div className="section-header">
          <h2>Espectadores</h2>
          <span className="section-count">
            {players.filter((p) => p.team == null).length}
          </span>
        </div>

        <div className="spectator-box">
          {players.filter((player) => player.team == null).length === 0 && (
            <div className="empty-message">No hay espectadores</div>
          )}

          {players
            .filter((player) => player.team == null)
            .map((player) => (
              <div key={player.id} className="player-card">
                <span>{player.name}</span>

                {isHost && player.id != playerId && (
                  <button
                    className="remove-player-btn"
                    onClick={() => EliminateSpectatorPlayer(player.id)}
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}

          <button className="spectate-btn" onClick={quitTeamPlayer}>
            Ir a espectador
          </button>
        </div>
      </div>

      <div className="teams-section">
        <div className="section-header">
          <h2>Equipos</h2>
          {isHost && (
            <button className="add-team-btn" onClick={addTeam}>
              + Agregar Equipo
            </button>
          )}
        </div>

        <div className="team-grid">
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
      </div>
    </div>
  );
}
