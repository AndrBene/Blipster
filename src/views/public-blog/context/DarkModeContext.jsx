import { createContext, useEffect, useState } from 'react';

export const DarkModeContext = createContext();

function DarkModeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(function () {
    const storedValue = localStorage.getItem('dark-mode');
    return storedValue ? JSON.parse(storedValue) : false;
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
      localStorage.setItem('dark-mode', JSON.stringify(isDarkMode));
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
