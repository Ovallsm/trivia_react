export default function TeamBox({ team, players, index }) {

  if (!team || team.id == null) {
    return null;
  }

  return (
    <div className="team-box">
      <h3>team {index + 1}</h3>
      {players.map((player) => (
        player.team === team.id ? (
          <div key={player.id || Math.random()} className="player">
            {player.name}
          </div>
        ) : null
      ))}

      <button>Join Team!</button>
    </div>
  );
}