import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import DarkModeToggle from './DarkModeToggle';
import {
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { fetchUserIsAuthenticated } from '../services/authApi';
import {
  HiMiniArrowRightStartOnRectangle,
  HiOutlineLockClosed,
  HiOutlineUser,
} from 'react-icons/hi2';

function Header() {
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
    <div className="flex content-center justify-between border-b-[1px] border-slate-800 bg-slate-800 px-5 py-3 md:px-12 xl:px-32 dark:bg-slate-900">
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
              <HiOutlineUser className="size-5 md:size-6" />
              <div className="hidden text-lg uppercase sm:block">
                Profile
              </div>
            </Link>
            <div
              className="flex items-center justify-between gap-2"
              onClick={logout}
            >
              <HiMiniArrowRightStartOnRectangle className="size-5 md:size-6" />
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
            <HiOutlineLockClosed className="size-5 md:size-6" />
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
