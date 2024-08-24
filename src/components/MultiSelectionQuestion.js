import React, { useState } from 'react';
import '../assets/styles/MultiSelectionQuestion.css';


const MultiSelectQuestion = ({ question, options, correctAnswers, onAnswer, onUseHint, hintUsed }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleOptionChange = (option) => {
    setSelectedOptions((prevOptions) => 
      prevOptions.includes(option) 
        ? prevOptions.filter((o) => o !== option) 
        : [...prevOptions, option]
    );
  };

  const handleSubmit = () => {
    if (selectedOptions.length === 0) {
      alert('Please select at least one option before submitting.');
      return;
    }
    const isCorrect = correctAnswers.every((answer) => selectedOptions.includes(answer)) && selectedOptions.every((answer) => correctAnswers.includes(answer));
    onAnswer(isCorrect, selectedOptions);
  };

  return (
    <div className="question">
      <h2>{question}</h2>
      {options.map((option) => (
        <div key={option}>
          <input
            type="checkbox"
            id={option}
            name="option"
            value={option}
            onChange={() => handleOptionChange(option)}
            checked={selectedOptions.includes(option)}
          />
          <label htmlFor={option}>{option}</label>
        </div>
      ))}
      <button onClick={handleSubmit}>Submit</button>
      {/* Display the "Use Hint" button only if the hint hasn't been used */}
      {!hintUsed && <button onClick={onUseHint}>Use Hint</button>}
    </div>
  );
};

export default MultiSelectQuestion;
