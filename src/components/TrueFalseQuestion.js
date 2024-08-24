import React, { useState } from 'react';
import '../assets/styles/TrueFalseQuestion.css';

const TrueFalseQuestion = ({ question, correctAnswer, onAnswer }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleSubmit = () => {
    setIsAnswered(true);
    onAnswer(selectedOption === correctAnswer);
  };

  return (
    <div className="true-false-question">
      <h2>{question}</h2>
      <label>
        <input
          type="radio"
          name="true-false"
          value="true"
          onChange={handleOptionChange}
          disabled={isAnswered}
        />
        True
      </label>
      <label>
        <input
          type="radio"
          name="true-false"
          value="false"
          onChange={handleOptionChange}
          disabled={isAnswered}
        />
        False
      </label>
      <button onClick={handleSubmit} disabled={isAnswered || selectedOption === null}>
        {isAnswered ? 'Next' : 'Submit'}
      </button>
    </div>
  );
};

export default TrueFalseQuestion;
