import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/styles/QuizSelection.css';

const quizzes = [
  { id: 'quiz1', name: 'General Knowledge' },
  { id: 'quiz2', name: 'Science' },
  { id: 'quiz3', name: 'Math' }
];

const QuizSelection = () => {
  const navigate = useNavigate();

  const handleQuizSelection = (quizId) => {
    navigate(`/quiz/${quizId}`);
  };

  return (
    <div className="quiz-selection">
      <h1>Select a Quiz</h1>
      <ul>
        {quizzes.map((quiz) => (
          <li key={quiz.id}>
            <button onClick={() => handleQuizSelection(quiz.id)}>{quiz.name}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuizSelection;
