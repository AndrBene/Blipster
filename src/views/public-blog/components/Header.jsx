import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import DarkModeToggle from './DarkModeToggle';
import {
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { fetchUserIsAuthenticated } from '../services/authApi';

function Header() {
  const navigate = useNavigate();

  const { data: userInfo } = useQuery({
    queryKey: ['isAuthenticated'],
    queryFn: fetchUserIsAuthenticated,
    meta: {
      protectedRouteErrorMessage:
        "Couldn't fetch user authentication status",
    },
  });

  const queryClient = useQueryClient();

  const { mutate: logout } = useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      toast.dismiss();
      toast.success('Logout successful!');

      navigate('/home?page=1');
      queryClient.invalidateQueries({
        queryKey: ['isAuthenticated'],
      });
    },
    onError: (error) => {
      toast.dismiss();
      toast.error(`${error}`);
    },
  });

  async function logoutUser() {
    toast.loading('Waiting for logout...');
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
  }
  return (
    <div className="flex content-center justify-between border-b-[1px] border-slate-800 bg-slate-800 px-5 py-3 dark:bg-slate-900 md:px-12 xl:px-32">
      <Link to="/">
        <img
          src="/blipster_logo.png"
          className="h-12 md:h-14 xl:h-20"
          alt="not found"
        />
      </Link>

      <div className="flex items-center justify-between gap-5 xl:gap-10">
        {userInfo?.authenticated ? (
          <div className="flex items-center justify-between gap-3 xl:gap-10">
            <Link
              to="/profile"
              className="flex items-center justify-between gap-2"
            >
              <img
                src="/profile.png"
                className="size-5 md:size-6 xl:size-8"
                alt="not found"
              />
              <div className="hidden text-lg uppercase sm:block">
                Profile
              </div>
            </Link>
            <div
              className="flex items-center justify-between gap-2"
              onClick={logout}
            >
              <img
                src="/logout.png"
                className="size-5 md:size-6 xl:size-7"
                alt="not found"
              />
              <button className="hidden text-lg uppercase sm:block">
                Logout
              </button>
            </div>
          </div>
        ) : (
          <Link
            to="/signin"
            className="flex items-center justify-between gap-2"
          >
            <img
              src="/signin.png"
              className="size-5 md:size-6 xl:size-8"
              alt="not found"
            />
            <div className="hidden text-lg uppercase sm:block">
              Sign in
            </div>
          </Link>
        )}
        <DarkModeToggle />
      </div>
    </div>
  );
}

export default Header;
