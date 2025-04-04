import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import {
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import ViewsWrapper from '../components/ViewsWrapper';
import { useEffect, useRef } from 'react';
import { fetchUserIsAuthenticated } from '../services/authApi';
import Loader from '../components/Loader';

function Signin() {
  const { register, handleSubmit, reset, formState } = useForm();
  const { errors } = formState;
  const navigate = useNavigate();
  const location = useLocation();
  const isLoggingRef = useRef(false); // Track if login is causing the state change

  const queryClient = useQueryClient();

  const { isFetching, data: userInfo } = useQuery({
    queryKey: ['isAuthenticated'],
    queryFn: fetchUserIsAuthenticated,
    meta: {
      protectedRouteErrorMessage:
        "Couldn't fetch user authentication status",
    },
  });

  const { mutate: login } = useMutation({
    mutationFn: loginUser,
    onSuccess: async () => {
      toast.dismiss();
      toast.success('Login successful!');
      isLoggingRef.current = true; // Mark login action

      queryClient.invalidateQueries({
        queryKey: ['isAuthenticated'],
      });

      navigate(`${location.state?.from || '/'}`);
      reset();
    },
    onError: (error) => {
      toast.dismiss();
      toast.error(`${error}`);
    },
  });

  async function loginUser(userInfo) {
    toast.loading('Waiting for sign in...');
    const res = await fetch(
      `http://localhost:3000/api/v1/users/login`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Sending JSON data
        },
        credentials: 'include',
        body: JSON.stringify(userInfo),
      },
    );

    const json = await res.json();

    if (json.status === 'error') {
      throw new Error(json.message);
    }
  }

  useEffect(
    function () {
      if (
        userInfo?.authenticated &&
        !isFetching &&
        !isLoggingRef.current
      )
        // Redirect only if NOT logging in (isLoggingRef == false)
        navigate('/');
    },
    [isFetching, navigate],
  );

  if (isFetching) {
    return <Loader text={''} />;
  }

  return (
    <ViewsWrapper>
      <div className="sticky top-0 bg-white pb-2 text-xl font-bold md:text-2xl xl:text-3xl dark:bg-slate-950">
        Login
      </div>
      <form
        className="flex grow flex-col justify-between gap-y-10 xl:grow-0"
        onSubmit={handleSubmit(login)}
      >
        <div className="flex flex-col gap-y-5">
          <div className="flex items-center gap-4 text-base xl:text-lg">
            {/* <div className="grid grid-cols-[6rem_3fr_1fr] items-center justify-start gap-x-4"> */}
            <label
              htmlFor=""
              className="basis-20 text-base md:text-lg xl:text-xl"
            >
              Username
            </label>
            <div className="grow text-base xl:text-lg">
              <input
                placeholder="username"
                className="input"
                type="text"
                id="username"
                {...register('username', {
                  required: 'Username is required',
                })}
              />
            </div>
          </div>
          <div className="flex gap-4">
            <div className="basis-20"></div>
            {errors?.username?.message && (
              <div className="text-red-500 xl:text-lg">
                {errors.username.message}
              </div>
            )}
          </div>

          <div className="flex items-center gap-4 text-base xl:text-lg">
            {/* <div className="grid grid-cols-[6rem_3fr_1fr] items-center justify-start gap-x-4"> */}
            <label
              htmlFor=""
              className="basis-20 text-base md:text-lg xl:text-xl"
            >
              Password
            </label>
            <div className="grow text-base xl:text-lg">
              <input
                type="password"
                className="input"
                placeholder="password"
                id="password"
                {...register('password', {
                  required: 'Password is required',
                })}
              />
            </div>
            {/* {errors?.password?.message && (
              <div className="text-red-500 xl:text-lg">
                {errors.password.message}
              </div>
            )} */}
          </div>
          <div className="flex gap-4">
            <div className="basis-20"></div>
            {errors?.password?.message && (
              <div className="text-red-500 xl:text-lg">
                {errors.password.message}
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col items-center xl:mt-10">
          <button className="mb-2 rounded-full bg-slate-800 px-8 py-3 text-base uppercase text-white transition-colors duration-200 hover:bg-slate-700 focus:bg-slate-700 focus:outline-none xl:px-12 xl:text-xl dark:bg-white dark:text-black dark:hover:bg-slate-200">
            Login
          </button>
          <div className="text-base md:text-lg xl:text-lg">
            <Link to="/register" className="underline">
              Sign Up
            </Link>
          </div>
        </div>
      </form>
    </ViewsWrapper>
  );
}

export default Signin;
