import { useContext } from "react";
import TokenContext from "../context/tokenContext";
import { joinTeam } from "../scripts/fetchRoom";
import { ELiminateTeam , removeFromMatch} from "../scripts/fetchRoom";

export default function TeamBox({
  team,
  players,
  index,
  setPlayers,
  teams,
  setTeams,
}) {
  const { token, roomId, playerId, isHost } = useContext(TokenContext);

  const JoinTeam = async (teamId) => {
    await joinTeam(teamId, token, roomId, playerId);

    setPlayers((prev) =>
      prev.map((player) =>
        player.id == playerId ? { ...player, team: teamId } : player,
      ),
    );
  };

  const EliminatePlayer = async (playerIdToRemove) => {

    setPlayers((prev) =>
      prev.filter((player) => player.id !== playerIdToRemove),
    );

    await removeFromMatch(playerIdToRemove, roomId, token);
  };
  const EliminateTeam = async (teamId) => {
    players
      .filter((player) => player.team == teamId)
      .forEach(async (players) => {
        await joinTeam(null, token, roomId, players.id);
      });

    await ELiminateTeam(teamId, token, roomId);

    setTeams((prev) => prev.filter((t) => t.id !== teamId));
  };

  if (!team || team.id == null) {
    return null;
  }

  const currentPlayer = players.find((p) => p.id === playerId);
  const playersInTeam = players.filter((p) => p.team === team.id);

 return (
  <div className="team-box">
    <div className="team-header">
      <h3 className="team-title">Equipo {index + 1}</h3>
      <span className="team-count">
        {playersInTeam.length} jugador{playersInTeam.length !== 1 && "es"}
      </span>
    </div>

    <div className="team-players">
      {playersInTeam.length === 0 && (
        <div className="empty-team">Sin jugadores</div>
      )}

      {playersInTeam.map((player) => (
        <div key={player.id} className="player-card">
          <span className="player-name">{player.name}</span>

          {isHost && player.id != playerId && (
            <button
              className="remove-player-btn"
              onClick={() => EliminatePlayer(player.id)}
            >
              ✕
            </button>
          )}
        </div>
      ))}
    </div>

    <div className="team-actions">
      {currentPlayer?.team != team.id && (
        <button
          className="join-btn"
          onClick={() => JoinTeam(team.id)}
        >
          Unirse al equipo
        </button>
      )}

      {isHost && (
        <button
          className="delete-team-btn"
          onClick={() => EliminateTeam(team.id)}
        >
          Eliminar equipo
        </button>
      )}
    </div>
  </div>
);
}