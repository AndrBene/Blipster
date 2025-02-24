import { useState } from 'react';
import {
  HiOutlineHome,
  HiOutlineInformationCircle,
} from 'react-icons/hi2';
import { Link } from 'react-router-dom';

function TopBar() {
  const [isHome, setIsHome] = useState(true);
  const selectedStyle =
    'border-slate-800 border-b-[1px] text-slate-800 dark:text-white dark:stroke-white dark:border-white';
  const unselectedStyle = 'text-slate-500';

  return (
    <div className="mt-4 flex content-start gap-x-5 border-b-[1px] border-gray-200 text-base md:text-lg xl:text-xl dark:border-slate-500">
      <Link
        to="/"
        className={`flex cursor-pointer items-center gap-2 ${isHome ? selectedStyle : unselectedStyle} p-5`}
        onClick={() => {
          setIsHome(true);
        }}
      >
        {/* <img
          src="/home.png"
          className={`size-5 ${isHome ? null : 'opacity-25'}`}
          alt="not found"
        /> */}
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
        {/* <img
          src="/about.png"
          className={`size-5 ${!isHome ? null : 'opacity-25'}`}
          alt="not found"
        /> */}
        <HiOutlineInformationCircle className="size-6" />
        <div>About</div>
      </Link>
    </div>
  );
}

export default TopBar;
