import { HiOutlineMoon, HiOutlineSun } from 'react-icons/hi2';
import { DarkModeContext } from '../context/DarkModeContext';
import { useContext } from 'react';

function DarkModeToggle() {
  const { isDarkMode, toggleDarkMode } = useContext(DarkModeContext);
  return (
    <button onClick={toggleDarkMode}>
      {isDarkMode ? (
        <HiOutlineSun className="size-5 xl:size-6" />
      ) : (
        <HiOutlineMoon className="size-5 xl:size-6" />
      )}
    </button>
  );
}

export default DarkModeToggle;
