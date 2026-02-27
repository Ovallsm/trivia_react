import { useContext } from "react";
import TokenContext from "../context/tokenContext";
import { joinTeam } from "../scripts/fetchRoom";

export default function TeamBox({ team, players, index, setPlayers }) {
  const { token, roomId, playerId } = useContext(TokenContext);

  const JoinTeam = async (teamId) => {
    await joinTeam(teamId, token, roomId, playerId);

    setPlayers((prev) =>
    
      prev.map((player) => (player.id == playerId ? { ...player, team: teamId } : player))
    );
  };

  if (!team || team.id == null) {
    return null;
  }

  console.log(playerId)
  const currentPlayer = players.find((p) => p.id === playerId);
  const playersInTeam = players.filter((p) => p.team === team.id);

  return (
    <div className="team-box">
      <h3>Team {index + 1}</h3>

      {playersInTeam.map((player) => (
        <div key={player.id} className="player">
          {player.name}
        </div>
      ))}

      {currentPlayer?.team !== team.id && (
        <button onClick={() => JoinTeam(team.id)}>Join Team!</button>
      )}
    </div>
  );
}
