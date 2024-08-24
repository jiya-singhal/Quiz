import React, { useState } from 'react';
import '../assets/styles/Question.css';

const Question = ({ question, options, correctAnswer, onAnswer }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const handleAnswerClick = (option) => {
    if (isAnswered) return; // Prevent further clicks after answering
    setSelectedOption(option);
    setIsAnswered(true);
    onAnswer(option === correctAnswer);
  };

  return (
    <div className="question">
      <h2>{question}</h2>
      <ul className="options">
        {options.map((option, index) => (
          <li key={index}>
            <button
              className={`option-button ${selectedOption === option ? (option === correctAnswer ? 'correct' : 'incorrect') : ''}`}
              onClick={() => handleAnswerClick(option)}
              disabled={isAnswered}
            >
              {option}
            </button>
          </li>
        ))}
      </ul>
      
      {isAnswered && (
        <div className="feedback">
          {selectedOption === correctAnswer ? (
            <p className="correct">Yes, correct! The answer is {correctAnswer}.</p>
          ) : (
            <p className="incorrect">Incorrect. The correct answer is {correctAnswer}.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Question;
