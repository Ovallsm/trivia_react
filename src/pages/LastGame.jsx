import "../styles/Results.css";
import { useContext, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import ResultsView from "../assets/ResultsView";
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
    <ResultsView
      teams={teams}
      players={players}
      rounds={rounds}
      questionsPerRound={questionsPerRound}
      questionsAnswered={questionsAnswered}
      getTeamPoints={getTeamPoints}
      isCorrectAnswer={isCorrectAnswer}
      winner={winner}
      goToCreateRoom={goToCreateRoom}
    />
  );
}
