import { HiOutlineMoon, HiOutlineSun } from 'react-icons/hi2';
import { useEffect, useState } from 'react';

function DarkModeToggle() {
  const [isDarkMode, setIsDarkMode] = useState(null);

  function toggleDarkMode() {
    setIsDarkMode(!isDarkMode);
  }

  useEffect(function () {
    const storedValue = localStorage.getItem('dark-mode');
    setIsDarkMode(storedValue ? JSON.parse(storedValue) : false);
  }, []);

  useEffect(
    function () {
      if (isDarkMode !== null) {
        isDarkMode
          ? document.documentElement.classList.add('dark')
          : document.documentElement.classList.remove('dark');
      }
    },
    [isDarkMode],
  );

  useEffect(
    function () {
      if (isDarkMode !== null)
        localStorage.setItem('dark-mode', JSON.stringify(isDarkMode));
    },
    [isDarkMode],
  );

  return (
    <button onClick={toggleDarkMode}>
      {isDarkMode ? (
        <HiOutlineSun className="size-5 md:size-6 xl:size-6" />
      ) : (
        <HiOutlineMoon className="size-5 md:size-6 xl:size-6" />
      )}
    </button>
  );
}

export default DarkModeToggle;
