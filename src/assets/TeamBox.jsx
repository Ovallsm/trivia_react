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
      <h3>Team {index + 1}</h3>

      {playersInTeam.map((player) => (
        <div key={player.id} className="player">
          {player.name}

          {isHost && player.id != playerId && (
            <button onClick={() => EliminatePlayer(player.id)}>
              X
            </button>
          )}
        </div>
      ))}

      {currentPlayer?.team !== team.id && (
        <button onClick={() => JoinTeam(team.id)}>Join Team!</button>
      )}

      {isHost && (
        <button onClick={() => EliminateTeam(team.id)}>Eliminar Equipo</button>
      )}
    </div>
  );
}
