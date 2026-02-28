import React from "react";

export default function QuestionZone({ questions }) {
  return (
    <div className="question-zone">
      {questions.map((q) => (
        <div key={q.id} className="question-card">
          
          <h3>{q.question}</h3>

          {q.mediaUrl && (
            <div className="question-media">
              <video src={q.mediaUrl} controls width="300" />
            </div>
          )}

          {q.type === "multiple" && (
            <div className="multiple-options">
              {q.options.map((option, index) => (
                <button key={index}>
                  {option}
                </button>
              ))}
            </div>
          )}

          {q.type === "short" && (
            <div className="short-answer">
              <input type="text" placeholder="Escribe tu respuesta..." />
            </div>
          )}

          {q.type === "buzzer" && (
            <div className="buzzer-answer">
              <input type="text" placeholder="¡Responde rápido!" />
            </div>
          )}

        </div>
      ))}
    </div>
  );
}