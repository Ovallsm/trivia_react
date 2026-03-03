import "../styles/Results.css";
import { useContext, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function LastGame() {
  const [teams, setTeams] = useState(null);
  const [players, setPlayers] = useState([]);
  const [rounds, setRounds] = useState([]);
  const [questionsPerRound, setQuestionsPerRound] = useState([]);
  const [questionsAnswered, setQuestionsAnswered] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedData = localStorage.getItem("lastGameResults");
    console.log(savedData);
    if (savedData) {
      const parsed = JSON.parse(savedData);

      setTeams(parsed.teams);
      setPlayers(parsed.players);
      setRounds(parsed.rounds);
      setQuestionsPerRound(parsed.questionsPerRound);
      setQuestionsAnswered(parsed.questionsAnswered);
    }
  }, []);

  if (!teams) {
    return (
      <div>
        No hay informacion de la partida
        <Link to="/"> Crear una partida</Link>
      </div>
    );
  }

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
    navigate("/");
  };
  return (
    <div className="results-wrapper">
      <div className="results-grid">
        {teams.map((team, index) => {
          const teamPlayers = players.filter((p) => p.team === team.id);
          const teamPoints = getTeamPoints(team.id);

          return (
            <div key={team.id} className="results-container">
              <h2>Team {index + 1}</h2>

              <h4>Jugadores:</h4>
              {teamPlayers.length > 0 ? (
                <ul>
                  {teamPlayers.map((player) => (
                    <li key={player.id}>{player.name}</li>
                  ))}
                </ul>
              ) : (
                <p className="empty-message">Sin jugadores</p>
              )}

              {rounds.map((round, roundIndex) => (
                <div key={round.id} className="round-block">
                  <h4>Ronda {roundIndex + 1}</h4>

                  {questionsPerRound[roundIndex]?.map((q, questionIndex) => {
                    const answers =
                      questionsAnswered[roundIndex]?.[questionIndex] || [];

                    return (
                      <div key={q.id} className="question-block">
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
                                  className={
                                    correct ? "answer-correct" : "answer-wrong"
                                  }
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
        <div className="winner-banner">
          Ganador: Team {teams.findIndex((t) => t.id === winner.id) + 1}
        </div>
      )}

      <button className="results-btn" onClick={goToCreateRoom}>
        Volver a crear sala
      </button>
    </div>
  );
}
