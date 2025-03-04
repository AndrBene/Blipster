import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import ViewsWrapper from '../components/ViewsWrapper';

function Signin() {
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const { mutate: login } = useMutation({
    mutationFn: loginUser,
    onSuccess: () => {
      toast.dismiss();
      toast.success('Login successful!');

      navigate('/home');

      reset();
      queryClient.invalidateQueries({
        queryKey: ['isAuthenticated'],
      });
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

  return (
    <ViewsWrapper>
      <div className="sticky top-0 bg-white pb-2 text-xl font-bold dark:bg-slate-950 md:text-2xl xl:text-3xl">
        Login
      </div>
      <form
        className="flex grow flex-col justify-between gap-y-10 xl:grow-0"
        onSubmit={handleSubmit(login)}
      >
        <div className="flex flex-col gap-y-5">
          <div className="flex items-center gap-4 text-base xl:text-lg">
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
                required
                id="username"
                {...register('username')}
              />
            </div>
          </div>

          <div className="flex items-center gap-4 text-base xl:text-lg">
            <label
              htmlFor=""
              className="basis-20 text-base md:text-lg xl:text-xl"
            >
              Password
            </label>
            <div className="grow text-base xl:text-lg">
              <input
                type="password"
                required
                className="input"
                placeholder="password"
                id="password"
                {...register('password')}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center xl:mt-10">
          <button className="mb-2 rounded-full bg-slate-800 px-8 py-3 text-base uppercase text-white transition-colors duration-200 hover:bg-slate-700 focus:bg-slate-700 focus:outline-none dark:bg-white dark:text-black dark:hover:bg-slate-200 xl:px-12 xl:text-xl">
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
