import React from 'react';
import { useNavigate } from 'react-router-dom';
import QuizSelection from '../components/QuizSelection';
import ThemeToggle from '../components/ThemeToggle';
import '../assets/styles/HomePage.css'; // Import the CSS

const HomePage = () => {
    const navigate = useNavigate();

    const quizzes = [
        { id: 1, title: 'General Knowledge', description: 'Test your general knowledge' },
        { id: 2, title: 'Science', description: 'Challenge your science skills' },
        { id: 3, title: 'Math', description: 'Test your math skills' },
    ];

    const startQuiz = (id) => {
        navigate(`/quiz/${id}`);
    };

    return (
        <div className="homepage-container">
            <h1>Select a Quiz</h1>
            <QuizSelection quizzes={quizzes} onQuizSelect={startQuiz} />
            <ThemeToggle />
        </div>
    );
};

export default HomePage;
