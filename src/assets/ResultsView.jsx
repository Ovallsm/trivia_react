export default function ResultsView({
  teams,
  players,
  rounds,
  questionsPerRound,
  questionsAnswered,
  getTeamPoints,
  isCorrectAnswer,
  winner,
  goToCreateRoom,
}) {
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