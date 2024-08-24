import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';

const ThemeToggle = () => {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <button onClick={toggleTheme} className="theme-toggle">
      <FontAwesomeIcon icon={theme === 'light' ? faMoon : faSun} />
      <span className="sr-only">
        Switch to {theme === 'light' ? 'Dark' : 'Light'} Theme
      </span>
    </button>
  );
};

export default ThemeToggle;
