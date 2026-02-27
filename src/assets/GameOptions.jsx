import { useState } from "react";

export default function GameOptions() {
  const [gameOptions, setGameOptions] = useState({
    rounds: "",
    timePerRound: "",
    questionsPerRound: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setGameOptions((prevOptions) => ({
      ...prevOptions,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(gameOptions); 
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