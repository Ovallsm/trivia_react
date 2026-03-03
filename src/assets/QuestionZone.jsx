import { useContext, useState } from "react";
import TokenContext from "../context/tokenContext";
import { sendAnswerFetch } from "../scripts/fetchGame";
import "../styles/game.css";

export default function QuestionZone({ questions, roundID }) {
  const { token, gameId } = useContext(TokenContext);
  const [answers, setAnswers] = useState({});
  const [status, setStatus] = useState({});
  const handleInputChange = (questionId, value) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const sendAnswer = async (answer, id) => {
    try {
      setStatus((prev) => ({ ...prev, [id]: "sending" }));

      await sendAnswerFetch(answer, id, roundID, gameId, token);
      setStatus((prev) => ({ ...prev, [id]: "success" }));
    } catch (error) {
      setStatus((prev) => ({ ...prev, [id]: "error" }));
    }
  };

  return (
    <div className="question-zone">
      {questions.map((q) => (
        <div key={q.id} className="question-card">
          <h3>{q.question}</h3>

          {q.mediaUrl && (
            <div className="question-media">
              <img src={q.mediaUrl} width="300" alt="question media" />
            </div>
          )}

          {q.type === "multiple_choice" && (
            <div className="multiple-options">
              {q.options.map((option, index) => {
                const isSelected = answers[q.id] === option;

                return (
                  <button
                    key={index}
                    className={isSelected ? "selected-answer" : ""}
                    onClick={() => {
                      handleInputChange(q.id, option);
                      sendAnswer(option, q.id);
                    }}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
          )}

          {q.type === "short_answer" && (
            <div className="short-answer">
              <input
                type="text"
                placeholder="Escribe tu respuesta..."
                value={answers[q.id] || ""}
                onChange={(e) => handleInputChange(q.id, e.target.value)}
              />
              <button
                className={answers[q.id] ? "submitted-answer" : ""}
                onClick={() => sendAnswer(answers[q.id], q.id)}
              >
                SEND!
              </button>
            </div>
          )}

          {q.type === "buzzer" && (
            <div className="buzzer-answer">
              <input
                type="text"
                placeholder="¡Responde rápido!"
                value={answers[q.id] || ""}
                onChange={(e) => handleInputChange(q.id, e.target.value)}
              />
              <button onClick={() => sendAnswer(answers[q.id], q.id)}>
                SEND!
              </button>
            </div>
          )}

          {status[q.id] === "sending" && <p className="sending">Enviando...</p>}

          {status[q.id] === "success" && (
            <p className="success">Respuesta enviada</p>
          )}

          {status[q.id] === "error" && <p className="error">Error al enviar</p>}
        </div>
      ))}
    </div>
  );
}
