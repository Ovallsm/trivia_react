export default function PlayerBox({ players }) {
  return (
    <div className="player-box">
      {players.map((player, index) => (
        <div key={index} className="player">
          {player.name}
        </div>
      ))}
    </div>
  );
}
