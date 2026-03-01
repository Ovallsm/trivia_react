import React, { useContext, useState } from "react";
import TokenContext from "../context/tokenContext";
import { sendAnswerFetch } from "../scripts/fetchGame";

export default function QuestionZone({ questions, roundID }) {

  const { token, gameId } = useContext(TokenContext);
  const [answers, setAnswers] = useState({});

  const handleInputChange = (questionId, value) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const sendAnswer = async (answer, id) => {
    try {
      await sendAnswerFetch(answer, id, roundID, gameId, token);
      
    } catch (error) {
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
              {q.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => sendAnswer(option, q.id)}
                >
                  {option}
                </button>
              ))}
            </div>
          )}

          {q.type === "short_answer" && (
            <div className="short-answer">
              <input
                type="text"
                placeholder="Escribe tu respuesta..."
                value={answers[q.id] || ""}
                onChange={(e) =>
                  handleInputChange(q.id, e.target.value)
                }
              />
              <button
                onClick={() =>
                  sendAnswer(answers[q.id], q.id)
                }
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
                onChange={(e) =>
                  handleInputChange(q.id, e.target.value)
                }
              />
              <button
                onClick={() =>
                  sendAnswer(answers[q.id], q.id)
                }
              >
                SEND!
              </button>
            </div>
          )}

        </div>
      ))}
    </div>
  );
}