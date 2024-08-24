import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Question from '../components/Question';
import MultiSelectQuestion from '../components/MultiSelectionQuestion';
import TrueFalseQuestion from '../components/TrueFalseQuestion';
import ProgressBar from '../components/ProgressBar';
import '../assets/styles/QuizPage.css'; 
import '../assets/styles/Container.css';

const quizData = {
  quiz1: [
    {
      type: 'single',
      question: 'What is the capital of France?',
      options: ['Berlin', 'Madrid', 'Paris', 'Lisbon'],
      correctAnswer: 'Paris',
      hint: 'It is known as the city of lights.'
    },
    {
      type: 'multi',
      question: 'Which of the following are fruits?',
      options: ['Carrot', 'Apple', 'Banana', 'Broccoli'],
      correctAnswers: ['Apple', 'Banana'],
      hint: 'Both are commonly found in desserts.'
    },
    {
      type: 'truefalse',
      question: 'The sky is green.',
      correctAnswer: 'false',
      hint: 'The color of the sky on a clear day is not green.'
    },
  ],
  quiz2: [
    {
      type: 'single',
      question: 'What is the capital of France?',
      options: ['Berlin', 'Madrid', 'Paris', 'Lisbon'],
      correctAnswer: 'Paris',
      hint: 'It is known as the city of lights.'
    },
    {
      type: 'multi',
      question: 'Which of the following are fruits?',
      options: ['Carrot', 'Apple', 'Banana', 'Broccoli'],
      correctAnswers: ['Apple', 'Banana'],
      hint: 'Both are commonly found in desserts.'
    },
    {
      type: 'truefalse',
      question: 'The sky is green.',
      correctAnswer: 'false',
      hint: 'The color of the sky on a clear day is not green.'
    },
  ],
  quiz3: [
    {
      type: 'single',
      question: 'What is the capital of France?',
      options: ['Berlin', 'Madrid', 'Paris', 'Lisbon'],
      correctAnswer: 'Paris',
      hint: 'It is known as the city of lights.'
    },
    {
      type: 'multi',
      question: 'Which of the following are fruits?',
      options: ['Carrot', 'Apple', 'Banana', 'Broccoli'],
      correctAnswers: ['Apple', 'Banana'],
      hint: 'Both are commonly found in desserts.'
    },
    {
      type: 'truefalse',
      question: 'The sky is green.',
      correctAnswer: 'false',
      hint: 'The color of the sky on a clear day is not green.'
    },
  ],
};

const QuizPage = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [timeLeft, setTimeLeft] = useState(10); // Timer for each question
  const [hintUsed, setHintUsed] = useState(false); // Track if hint is used
  const [hintMessage, setHintMessage] = useState('');

  // Ensure the quizData exists and is valid
  const questions = useMemo(() => quizData[quizId] || [], [quizId]);
  const totalQuestions = questions.length;

  const handleAnswer = useCallback(
    (isCorrect, selectedOption) => {
      const currentQuestion = questions[currentQuestionIndex];
      let feedback = '';

      if (currentQuestion.type === 'multi') {
        const correctAnswersSet = new Set(currentQuestion.correctAnswers);
        const selectedAnswersSet = new Set(selectedOption); // Assuming selectedOption is an array

        const allCorrect = [...selectedAnswersSet].every(answer => correctAnswersSet.has(answer));
        const allSelectedCorrect = [...correctAnswersSet].every(answer => selectedAnswersSet.has(answer));
        
        if (allCorrect && allSelectedCorrect) {
          setScore((prevScore) => prevScore + (hintUsed ? 0.5 : 1));
          feedback = `Yes, correct! The correct answers are ${currentQuestion.correctAnswers.join(', ')}.`;
        } else {
          feedback = `Incorrect. The correct answers are ${currentQuestion.correctAnswers.join(', ')}.`;
        }
      } else if (currentQuestion.type === 'truefalse' || currentQuestion.type === 'single') {
        if (isCorrect) {
          setScore((prevScore) => prevScore + (hintUsed ? 0.5 : 1));
          feedback = `Yes, correct! The answer is ${currentQuestion.correctAnswer}.`;
        } else {
          feedback = `Incorrect. The correct answer is ${currentQuestion.correctAnswer}.`;
        }
      }

      setFeedbackMessage(feedback);
      setShowFeedback(true);

      setTimeout(() => {
        setShowFeedback(false);
        setHintUsed(false); // Reset hint usage for next question
        setHintMessage(''); // Clear hint message
        setTimeLeft(10); // Reset timer for the next question
        if (currentQuestionIndex < totalQuestions - 1) {
          setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
          navigate(`/summary?score=${score + (isCorrect ? (hintUsed ? 0.5 : 1) : 0)}&total=${totalQuestions}`);
        }
      }, 2000); // 2-second delay before navigating to the next question or summary
    },
    [currentQuestionIndex, navigate, score, totalQuestions, questions, hintUsed]
  );

  const handleUseHint = () => {
    const currentQuestion = questions[currentQuestionIndex];
    setHintMessage(currentQuestion.hint);
    setHintUsed(true);
  };

  useEffect(() => {
    if (timeLeft === 0) {
      alert("Oops! Time's up!");
      handleAnswer(false, []); // Automatically move to the next question if time runs out
    }

    if (timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [timeLeft, handleAnswer]);

  if (totalQuestions === 0) {
    return <div>Quiz not found.</div>; // Handle the case where the quiz is not found
  }

  const renderQuestion = (question) => {
    return (
      <div className="question-container">
        {question.type === 'single' && (
          <Question
            question={question.question}
            options={question.options}
            correctAnswer={question.correctAnswer}
            onAnswer={handleAnswer}
            onUseHint={handleUseHint}
            hintUsed={hintUsed}
          />
        )}
        {question.type === 'multi' && (
          <MultiSelectQuestion
            question={question.question}
            options={question.options}
            correctAnswers={question.correctAnswers}
            onAnswer={handleAnswer}
            onUseHint={handleUseHint}
            hintUsed={hintUsed}
          />
        )}
        {question.type === 'truefalse' && (
          <TrueFalseQuestion
            question={question.question}
            correctAnswer={question.correctAnswer}
            onAnswer={handleAnswer}
            onUseHint={handleUseHint}
            hintUsed={hintUsed}
          />
        )}
        {/* Display the hint message if a hint has been used */}
        {hintMessage && <div className="hint-message">{hintMessage}</div>}
      </div>
    );
  };

  return (
    <div className="quiz-page">
      <ProgressBar currentQuestion={currentQuestionIndex + 1} totalQuestions={totalQuestions} />
      
      {/* Display current question number and total questions */}
      <div className="question-number">
        Q {currentQuestionIndex + 1}/{totalQuestions}
      </div>

      {/* Display the countdown timer with a conditional class for urgency */}
      <div className={`timer ${timeLeft <= 5 ? 'urgent' : ''}`}>
        Time left: {timeLeft} seconds
      </div>
      
      {showFeedback ? (
        <div className="feedback">
          {feedbackMessage}
        </div>
      ) : (
        renderQuestion(questions[currentQuestionIndex])
      )}
    </div>
  );
};

export default QuizPage;
