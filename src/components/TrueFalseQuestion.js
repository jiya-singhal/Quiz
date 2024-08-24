import React, { useState } from 'react';
import '../assets/styles/TrueFalseQuestion.css';

const TrueFalseQuestion = ({ question, correctAnswer, onAnswer, onUseHint, hintUsed }) => {
  const handleSubmit = (selectedAnswer) => {
    const isCorrect = selectedAnswer.toString() === correctAnswer.toString();
    onAnswer(isCorrect, selectedAnswer);
  };

  return (
    <div className="question">
      <h2>{question}</h2>
      <div>
        <button onClick={() => handleSubmit(true)}>True</button>
        <button onClick={() => handleSubmit(false)}>False</button>
      </div>
      {/* Display the "Use Hint" button only if the hint hasn't been used */}
      {!hintUsed && <button onClick={onUseHint}>Use Hint</button>}
    </div>
  );
};

export default TrueFalseQuestion;
