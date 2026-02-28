import { useState } from "react";
import { useContext } from "react";
import TokenContext from "../context/tokenContext";
import { useNavigate } from "react-router-dom";
import { startGame } from "../scripts/fetchGame";
export default function GameOptions() {
  var navigate = useNavigate();
  const { token, roomId, setGameId } = useContext(TokenContext);
  const [gameOptions, setGameOptions] = useState({
    rounds: 2,
    timePerRound: 60,
    questionsPerRound: 2,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setGameOptions((prevOptions) => ({
      ...prevOptions,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    var result = await startGame(roomId, token, gameOptions);
    console.log(result)
    setGameId();

    navigate("/game");
  };

  return (
    <div className="game-options">
      <h1>Game Options</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Number of Rounds</label>
          <input
            type="number"
            name="rounds"
            value={gameOptions.rounds}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Time Per Round (seconds)</label>
          <input
            type="number"
            name="timePerRound"
            value={gameOptions.timePerRound}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Questions Per Round</label>
          <input
            type="number"
            name="questionsPerRound"
            value={gameOptions.questionsPerRound}
            onChange={handleChange}
          />
        </div>

        <button type="submit">Start!</button>
      </form>
    </div>
  );
}
