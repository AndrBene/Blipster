import { useEffect, useState } from 'react';
import {
  HiOutlineHome,
  HiOutlineInformationCircle,
} from 'react-icons/hi2';
import { Link, useLocation } from 'react-router-dom';

function TopBar() {
  const location = useLocation();
  const [isHome, setIsHome] = useState(null);
  const [pageNum, setPageNum] = useState('1');

  const selectedStyle =
    'border-slate-800 border-b-[1px] text-slate-800 dark:text-white dark:stroke-white dark:border-white';
  const unselectedStyle = 'text-slate-500';

  useEffect(
    function () {
      if (location.pathname === '/home') {
        setIsHome(true);
      } else {
        setIsHome(false);
      }
    },
    [location.pathname],
  );

  useEffect(() => {
    const savedPage = localStorage.getItem('currentPageNum');
    if (savedPage) {
      setPageNum(savedPage);
    }
  }, []);

  return (
    <div className="sticky top-0 flex content-start gap-x-5 border-b-[1px] border-gray-200 bg-white text-base md:text-lg xl:text-xl dark:border-slate-500 dark:bg-slate-950">
      <Link
        to={`/home?page=${pageNum}`}
        className={`flex cursor-pointer items-center gap-2 ${isHome ? selectedStyle : unselectedStyle} p-5`}
        onClick={() => {
          setIsHome(true);
        }}
      >
        <HiOutlineHome />
        <div>Home</div>
      </Link>
      <Link
        to="/public-blog/about"
        className={`${!isHome ? selectedStyle : unselectedStyle} flex cursor-pointer items-center gap-2 p-5`}
        onClick={() => {
          setIsHome(false);
        }}
      >
        <HiOutlineInformationCircle className="size-6" />
        <div>About</div>
      </Link>
    </div>
  );
}

export default TopBar;
