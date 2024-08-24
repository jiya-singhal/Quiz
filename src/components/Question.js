import React, { useState, useCallback } from 'react';

const Question = ({ question, options, correctAnswer, onAnswer, onUseHint, hintUsed }) => {
  const [selectedOption, setSelectedOption] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false); // New state to manage submission

  const handleOptionChange = useCallback((option) => {
    setSelectedOption(option);
  }, []);

  const handleSubmit = useCallback(() => {
    if (selectedOption === '') {
      alert('Please select an option before submitting.');
      return;
    }

    setIsSubmitted(true); // Disable further submissions
    const isCorrect = selectedOption === correctAnswer;
    onAnswer(isCorrect, selectedOption);
  }, [selectedOption, correctAnswer, onAnswer]);

  return (
    <div className="question">
      <h2>{question}</h2>
      {options.map((option) => (
        <div key={option}>
          <input
            type="radio"
            id={option}
            name="option"
            value={option}
            onChange={() => handleOptionChange(option)}
            checked={selectedOption === option}
          />
          <label htmlFor={option}>{option}</label>
        </div>
      ))}
      <div className="question-actions">
        <button onClick={handleSubmit} disabled={isSubmitted}>Submit</button>
        {/* Display the "Use Hint" button only if the hint hasn't been used */}
        {!hintUsed && <button onClick={onUseHint} disabled={isSubmitted}>Use Hint</button>}
      </div>
    </div>
  );
};

export default Question;
