import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import QuizSelection from './components/QuizSelection';
import QuizPage from './pages/QuizPage';
import SummaryPage from './pages/SummaryPage';
import ThemeToggle from './components/ThemeToggle';
import './assets/styles/lightTheme.css'; // Default theme
import './assets/styles/darkTheme.css';
import '/home/jiya/quiz-app/src/App.css';
import './assets/styles/Responsive.css';



const App = () => {
  return (
    <Router>
      <div className="app">
        <ThemeToggle />
        <Routes>
          <Route path="/" element={<QuizSelection />} />
          <Route path="/quiz/:quizId" element={<QuizPage />} />
          <Route path="/summary" element={<SummaryPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
