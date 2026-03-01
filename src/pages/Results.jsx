import { useContext, useEffect, useState } from "react";
import TokenContext from "../context/tokenContext";
import {
  fetchGame,
  fetchRounds,
  getQuestionsOfRound,
  getQuestionsAnswers,
} from "../scripts/fetchGame";
import { getRoomPlayers, getRoomsTeams } from "../scripts/fetchRoom";
import "../styles/Results.css";
import { useNavigate } from "react-router-dom";

export default function Results() {
  const { token, gameId, roomId } = useContext(TokenContext);
  const navigator = useNavigate();
  const [teams, setTeams] = useState([]);
  const [players, setPlayers] = useState([]);
  const [questionsAnswered, setQuestionsAnswered] = useState([]);
  const [rounds, setRounds] = useState([]);
  const [questionsPerRound, setQuestionsPerRound] = useState([]);

  useEffect(() => {
       if (token == null) {
      navigator("/");
      return;
    }
    const loadData = async () => {
      try {
        const teamsData = await getRoomsTeams(roomId, token);
        setTeams(teamsData);

        const playersData = await getRoomPlayers(roomId, token);
        setPlayers(playersData);

        const game = await fetchGame(token, gameId);

        if (game) {
          const roundsData = await fetchRounds(token, gameId);
          setRounds(roundsData);

          const allQuestionsPromises = roundsData.map((round) =>
            getQuestionsOfRound(round, token, gameId),
          );

          const questions = await Promise.all(allQuestionsPromises);
          setQuestionsPerRound(questions);

          const allAnswersPromises = questions.map(
            (roundQuestions, roundIndex) =>
              Promise.all(
                roundQuestions.map((question) =>
                  getQuestionsAnswers(
                    question.id,
                    roundsData[roundIndex].id,
                    gameId,
                    token,
                  ),
                ),
              ),
          );

          const allAnswers = await Promise.all(allAnswersPromises);
          setQuestionsAnswered(allAnswers);
        }
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };

    loadData();
  }, [roomId, token, gameId]);

  const isCorrectAnswer = (question, answer) => {
    if (!answer) return false;

    const normalize = (str) => str.trim().toLowerCase();

    return question.correctAnswers.some(
      (correct) => normalize(correct) === normalize(answer),
    );
  };

  const getTeamPoints = (teamId) => {
    let points = 0;

    questionsPerRound.forEach((roundQuestions, roundIndex) => {
      roundQuestions.forEach((question, questionIndex) => {
        const answers = questionsAnswered[roundIndex]?.[questionIndex] || [];

        answers.forEach((ans) => {
          if (ans.teamId === teamId && isCorrectAnswer(question, ans.answer)) {
            points++;
          }
        });
      });
    });

    return points;
  };

  const winner = teams.reduce((prev, current) => {
    return getTeamPoints(current.id) > getTeamPoints(prev.id) ? current : prev;
  }, teams[0]);

  const goToCreateRoom = () => {
    localStorage.clear();
    navigator("/");
  };
  return (
    <div>
      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        {teams.map((team, index) => {
          const teamPlayers = players.filter((p) => p.team === team.id);

          const teamPoints = getTeamPoints(team.id);

          return (
            <div
              key={team.id}
              style={{
                border: "1px solid #ccc",
                borderRadius: "10px",
                padding: "16px",
                width: "350px",
              }}
              className="results-container"
            >
              <h2>Team {index + 1}</h2>

              <h4>Jugadores:</h4>
              <ul>
                {teamPlayers.map((player) => (
                  <li key={player.id}>{player.name}</li>
                ))}
              </ul>

              {rounds.map((round, roundIndex) => (
                <div key={round.id} style={{ marginBottom: "16px" }}>
                  <h4>Ronda {roundIndex + 1}</h4>

                  {questionsPerRound[roundIndex]?.map((q, questionIndex) => {
                    const answers =
                      questionsAnswered[roundIndex]?.[questionIndex] || [];

                    return (
                      <div key={q.id}>
                        <strong>
                          Pregunta {questionIndex + 1}: {q.question}
                        </strong>

                        <ul>
                          {answers
                            .filter((a) => a.teamId === team.id)
                            .map((ans) => {
                              const player = players.find(
                                (p) => p.id === ans.playerId,
                              );

                              const correct = isCorrectAnswer(q, ans.answer);

                              return (
                                <li
                                  key={ans.id}
                                  style={{
                                    color: correct ? "green" : "red",
                                  }}
                                >
                                  {player?.name} → {ans.answer}
                                </li>
                              );
                            })}
                        </ul>
                      </div>
                    );
                  })}
                </div>
              ))}

              <h3>Total puntos: {teamPoints}</h3>
            </div>
          );
        })}
      </div>

      {winner && (
        <h1 style={{ marginTop: "30px" }}>
          Ganador: Team {teams.findIndex((t) => t.id === winner.id) + 1}
        </h1>
      )}

      <button onClick={() => goToCreateRoom()}>Volver a crear sala</button>
    </div>
  );
}
