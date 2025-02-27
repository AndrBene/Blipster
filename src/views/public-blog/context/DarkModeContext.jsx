import { createContext, useEffect, useState } from 'react';

export const DarkModeContext = createContext();

function DarkModeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(function () {
    if (typeof localStorage !== 'undefined') {
      const storedValue = localStorage.getItem('dark-mode');
      return storedValue ? JSON.parse(storedValue) : false;
    } else {
      console.log(
        'Web Storage is not supported in this environment.',
      );
      return false;
    }
  });

  function toggleDarkMode() {
    setIsDarkMode(!isDarkMode);
  }

  useEffect(
    function () {
      isDarkMode
        ? document.documentElement.classList.add('dark')
        : document.documentElement.classList.remove('dark');
    },
    [isDarkMode],
  );

  useEffect(
    function () {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('dark-mode', JSON.stringify(isDarkMode));
      }
    },
    [isDarkMode],
  );

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}

export default DarkModeProvider;
