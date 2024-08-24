Sure! I'll guide you through the entire code structure for the Quiz App, including all the necessary files, components, and features. Below is a complete implementation in React.

### Project Structure:
```
src/
│
├── components/
│   ├── QuizSelection.js         
│   ├── Question.js              
│   ├── ProgressBar.js           
│   ├── Summary.js               
│   ├── ThemeToggle.js           
│   └── MultiSelectQuestion.js
│
├── pages/
│   ├── HomePage.js              
│   ├── QuizPage.js              
│   ├── SummaryPage.js           
│
├── context/
│   └── ThemeContext.js          
│
├── assets/
│   └── styles/
│       ├── lightTheme.css       
│       └── darkTheme.css        
│
├── App.js                       
├── index.js                     
└── ...                          
```

### Step-by-Step Code Implementation

---

#### 1. **Setting Up the Project**

1. **Initialize the Project:**
   ```bash
   npx create-react-app quiz-app
   cd quiz-app
   npm install react-router-dom
   ```

2. **Set up basic routing** in `App.js`:

```javascript
// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import QuizPage from './pages/QuizPage';
import SummaryPage from './pages/SummaryPage';
import { ThemeProvider } from './context/ThemeContext';

function App() {
    return (
        <ThemeProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/quiz/:id" element={<QuizPage />} />
                    <Route path="/summary" element={<SummaryPage />} />
                </Routes>
            </Router>
        </ThemeProvider>
    );
}

export default App;
```

3. **Index file to render the App**:

```javascript
// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/styles/lightTheme.css';
import './assets/styles/darkTheme.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
```

---

#### 2. **Theme Context**

1. **Create ThemeContext for toggling themes**:

```javascript
// src/context/ThemeContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState('light');

    useEffect(() => {
        document.body.className = theme;
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
```

2. **Theme Toggle Component**:

```javascript
// src/components/ThemeToggle.js
import React from 'react';
import { useTheme } from '../context/ThemeContext';

const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <button onClick={toggleTheme}>
            Switch to {theme === 'light' ? 'Dark' : 'Light'} Theme
        </button>
    );
};

export default ThemeToggle;
```

---

#### 3. **HomePage Component (Quiz Selection)**

1. **HomePage Component**:

```javascript
// src/pages/HomePage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import QuizSelection from '../components/QuizSelection';
import ThemeToggle from '../components/ThemeToggle';

const HomePage = () => {
    const navigate = useNavigate();

    const quizzes = [
        { id: 1, title: 'General Knowledge', description: 'Test your general knowledge' },
        { id: 2, title: 'Science', description: 'Challenge your science skills' },
    ];

    const startQuiz = (id) => {
        navigate(`/quiz/${id}`);
    };

    return (
        <div>
            <h1>Select a Quiz</h1>
            <QuizSelection quizzes={quizzes} onQuizSelect={startQuiz} />
            <ThemeToggle />
        </div>
    );
};

export default HomePage;
```

2. **QuizSelection Component**:

```javascript
// src/components/QuizSelection.js
import React from 'react';

const QuizSelection = ({ quizzes, onQuizSelect }) => {
    return (
        <div>
            {quizzes.map((quiz) => (
                <div key={quiz.id} className="quiz-card">
                    <h2>{quiz.title}</h2>
                    <p>{quiz.description}</p>
                    <button onClick={() => onQuizSelect(quiz.id)}>Start Quiz</button>
                </div>
            ))}
        </div>
    );
};

export default QuizSelection;
```

---

#### 4. **QuizPage Component**

1. **QuizPage Component**:

```javascript
// src/pages/QuizPage.js
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Question from '../components/Question