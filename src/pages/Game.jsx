import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  fetchGame,
  fetchRounds,
  getQuestionsOfRound,
} from "../scripts/fetchGame";

import QuestionZone from "../assets/QuestionZone";
import TokenContext from "../context/tokenContext";

export default function Game() {
  const { token, gameId } = useContext(TokenContext);
  const navigate = useNavigate();
  const [gameData, setGameData] = useState(null);
  const [rounds, setRounds] = useState([]);
  const [currentRound, setCurrentRound] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(null);

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
        setCurrentRound((prev) => {
          if (!prev || prev.id !== activeRound.id) {
            return activeRound;
          }
          return prev;
        });

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

  useEffect(() => {
    if (!currentRound) return;

    const loadQuestions = async () => {
      try {
        const questions = await getQuestionsOfRound(
          currentRound,
          token,
          gameId,
        );
        setCurrentQuestion(questions);
      } catch (err) {
        console.error(err);
      }
    };

    loadQuestions();
  }, [currentRound, token, gameId]);

  const currentRoundNumber = currentRound
    ? rounds.findIndex((r) => r.id === currentRound.id) + 1
    : null;


    if (currentRound && (currentRoundNumber == rounds.length && timeLeft == 0)) {
    console.log("gg!")
    navigate("/results");
  }

  return (
    <>
      {currentRound ? (
        <>
          <div className="game-header">
            {currentRound && (
              <div className="round-info">
                <h3>
                  Round {currentRoundNumber} of {rounds.length}
                </h3>
                <h3 className={`timer ${timeLeft <= 10 ? "warning" : ""}`}>
                  Time Left: {timeLeft}s
                </h3>
              </div>
            )}
          </div>

          {currentQuestion ? (
            <QuestionZone
              questions={currentQuestion}
              roundID={currentRound.id}
            />
          ) : (
            <h3>Loading questions...</h3>
          )}
        </>
      ) : (
        <>
          <div className="loading">Loading!</div>
        </>
      )}
    </>
  );
}
