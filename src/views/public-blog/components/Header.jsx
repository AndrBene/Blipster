import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import toast from 'react-hot-toast';
import DarkModeToggle from './DarkModeToggle';

function Header() {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  async function logoutUser() {
    try {
      const res = await fetch(
        `http://localhost:3000/api/v1/users/logout`,
        {
          credentials: 'include',
        },
      );

      const json = await res.json();

      if (json.status === 'error') {
        throw new Error(json.message);
      }

      toast.success('Logout successful!');

      auth.logout();
      navigate('/home');
    } catch (error) {
      toast.error(`${error}`);
    }
  }
  return (
    <div className="flex content-center justify-between border-b-[1px] border-slate-800 bg-slate-800 px-32 py-3 dark:bg-slate-900">
      <Link to="/">
        <img
          src="/blipster_logo.png"
          className="h-20"
          alt="not found"
        />
      </Link>

      <div className="flex items-center justify-between gap-10">
        {auth.isLoggedIn ? (
          <div className="flex items-center justify-between gap-10">
            <Link
              to="/profile"
              className="flex items-center justify-between gap-2"
            >
              <img
                src="/profile.png"
                className="size-8"
                alt="not found"
              />
              <div className="text-lg uppercase">Profile</div>
            </Link>
            <div
              className="flex items-center justify-between gap-2"
              onClick={logoutUser}
            >
              <img
                src="/logout.png"
                className="size-7"
                alt="not found"
              />
              <button className="text-lg uppercase">Logout</button>
            </div>
          </div>
        ) : (
          <Link
            to="/signin"
            className="flex items-center justify-between gap-2"
          >
            <img
              src="/signin.png"
              className="size-8"
              alt="not found"
            />
            <div className="text-lg uppercase">Sign in</div>
          </Link>
        )}
        <DarkModeToggle />
      </div>
    </div>
  );
}

export default Header;
