import { useContext, useEffect, useState } from "react";
import { fetchGame, fetchRounds } from "../scripts/fetchGame";
import TokenContext from "../context/tokenContext";

export default function Game() {
  const { token, gameId } = useContext(TokenContext);

  const [gameData, setGameData] = useState(null);
  const [rounds, setRounds] = useState([]);
  const [currentRound, setCurrentRound] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [roundIndex, setRoundIndex] = useState(0);

  useEffect(() => {
    if (!gameId) return;

    const load = async () => {
      try {
        const game = await fetchGame(token, gameId);
        const roundsData = await fetchRounds(token, gameId);

        setGameData(game);
        setRounds(roundsData);
      } catch (err) {
        console.error(err);
      }
    };

    load();
  }, [gameId, token]);

  useEffect(() => {
    if (!rounds.length) return;

    const interval = setInterval(() => {
      const now = Date.now();

      const activeRound = rounds.find((r) => {
        const start = new Date(r.createdAt).getTime();
        const end = new Date(r.endedAt).getTime();
        return now >= start && now <= end;
      });

      if (activeRound) {
        setCurrentRound(activeRound);

        const endTime = new Date(activeRound.endedAt).getTime();
        const remaining = Math.max(0, endTime - now);
        setTimeLeft(Math.floor(remaining / 1000));
      } else {
        setCurrentRound(null);
        setTimeLeft(0);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [rounds]);

  if (!gameData) return <>Loading...</>;

  const currentRoundNumber = currentRound
    ? rounds.findIndex((r) => r.id === currentRound.id) + 1
    : null;
  return (
    <>
      <h2>Game ID: {gameData.id}</h2>

      {currentRound ? (
        <>
          <h3>
            Round {currentRoundNumber} of {rounds.length}
          </h3>

          <h3>Time Left: {timeLeft}s</h3>
        </>
      ) : (
        <h3>No active round</h3>
      )}

    </>
  );
}
