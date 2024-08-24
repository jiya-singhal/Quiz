import React, { useState } from 'react';
import '../assets/styles/MultiSelectionQuestion.css';

const MultiSelectQuestion = ({ question, options, correctAnswers, onAnswer }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [isAnswered, setIsAnswered] = useState(false);

  const handleOptionChange = (option) => {
    setSelectedOptions((prevSelected) =>
      prevSelected.includes(option)
        ? prevSelected.filter((o) => o !== option)
        : [...prevSelected, option]
    );
  };

  const handleSubmit = () => {
    const isCorrect =
      selectedOptions.length === correctAnswers.length &&
      selectedOptions.every((option) => correctAnswers.includes(option));
    setIsAnswered(true);
    onAnswer(isCorrect);
  };

  return (
    <div className="multi-select-question">
      <h2>{question}</h2>
      {options.map((option, index) => (
        <label key={index}>
          <input
            type="checkbox"
            value={option}
            checked={selectedOptions.includes(option)}
            onChange={() => handleOptionChange(option)}
            disabled={isAnswered}
          />
          {option}
        </label>
      ))}
      <button onClick={handleSubmit} disabled={isAnswered}>
        {isAnswered ? 'Next' : 'Submit'}
      </button>
    </div>
  );
};

export default MultiSelectQuestion;
