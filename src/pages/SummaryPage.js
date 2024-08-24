
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../assets/styles/SummaryPage.css';

const SummaryPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const score = searchParams.get('score');
  const total = searchParams.get('total');

  return (
    <div className="summary">
      <h1>Quiz Completed!</h1>
      <p>
        Your final score is {score} out of {total}.
      </p>
      <button onClick={() => navigate('/')}>Back to Home</button>
    </div>
  );
};

export default SummaryPage;