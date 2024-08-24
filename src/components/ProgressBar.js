import React from 'react';
import '../assets/styles/ProgressBar.css';

const ProgressBar = ({ currentQuestion, totalQuestions }) => {
  const progress = (currentQuestion / totalQuestions) * 100;

  return (
    <div className="progress-bar">
      <div
        className="progress-bar-fill"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default ProgressBar;