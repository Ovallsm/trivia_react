import { useState } from "react";
import { useContext } from "react";
import TokenContext from "../context/tokenContext";
import { useNavigate } from "react-router-dom";
import { startGame } from "../scripts/fetchGame";
export default function GameOptions(teams) {
  var navigate = useNavigate();
  const { token, roomId, setGameId, isHost } = useContext(TokenContext);
  const [gameOptions, setGameOptions] = useState({
    rounds: 2,
    timePerRound: 60,
    questionsPerRound: 2,
  });
  const [error, setError] = useState(null);
  const handleChange = (e) => {
    const { name, value } = e.target;

    setGameOptions((prevOptions) => ({
      ...prevOptions,
      [name]: value,
    }));
  };

  console.log(teams);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      if (teams.teams.length <= 0) {
        setError("please set one team for starting the match");
        return;
      }
      const result = await startGame(roomId, token, gameOptions);
      console.log(teams.teams.length);

      if (!result || !result.id) {
        throw new Error("Invalid response from server");
      }

      setGameId(result.id);
      navigate("/game");
    } catch (err) {
      console.error(err);
      setError("Failed to start game. Please try again.");
    }
  };

  if (!isHost) return null;
  return (
    <div className="game-options-wrapper">
      <div className="game-options-card">
        <h2 className="game-options-title">Game Options</h2>

        <form className="game-options-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="rounds">Number of Rounds</label>
            <input
              id="rounds"
              type="number"
              name="rounds"
              min="1"
              value={gameOptions.rounds}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="timePerRound">Time Per Round (seconds)</label>
            <input
              id="timePerRound"
              type="number"
              name="timePerRound"
              min="10"
              value={gameOptions.timePerRound}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="questionsPerRound">Questions Per Round</label>
            <input
              id="questionsPerRound"
              type="number"
              name="questionsPerRound"
              min="1"
              value={gameOptions.questionsPerRound}
              onChange={handleChange}
            />
          </div>

          {error && <p className="form-error">{error}</p>}

          <button className="start-game-btn" type="submit">
            Start Game
          </button>
        </form>
      </div>
    </div>
  );
}
