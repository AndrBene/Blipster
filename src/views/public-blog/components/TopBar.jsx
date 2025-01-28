import { useState } from 'react';
import { Link } from 'react-router-dom';

function TopBar() {
  const [isHome, setIsHome] = useState(true);
  const selectedStyle =
    'border-slate-800 border-b-[1px] text-slate-800';
  const unselectedStyle = 'text-stone-400';

  return (
    <div className="mt-4 flex content-start gap-x-5 border-b-[1px] border-gray-200 text-xl">
      <Link
        to="/"
        className={`selectedStyle flex cursor-pointer items-center gap-2 ${isHome ? selectedStyle : unselectedStyle} p-5`}
        onClick={() => {
          setIsHome(true);
        }}
      >
        <img
          src="/home.png"
          className={`size-5 ${isHome ? null : 'opacity-25'}`}
          alt="not found"
        />
        <div>Home</div>
      </Link>
      <Link
        to="/public-blog/about"
        className={`${!isHome ? selectedStyle : unselectedStyle} flex cursor-pointer items-center gap-2 p-5`}
        onClick={() => {
          setIsHome(false);
        }}
      >
        <img
          src="/about.png"
          className={`size-5 ${!isHome ? null : 'opacity-25'}`}
          alt="not found"
        />
        <div>About</div>
      </Link>
    </div>
  );
}

export default TopBar;
