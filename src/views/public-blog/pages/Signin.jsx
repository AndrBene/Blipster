import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';

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
    <div className="flex justify-center">
      <div className="mt-10 w-2/3 text-black sm:w-3/6 lg:w-1/3 dark:text-white">
        <div className="mb-12 text-xl font-bold md:text-2xl xl:mb-16 xl:text-3xl">
          Login
        </div>
        <form onSubmit={handleSubmit(login)}>
          <div className="mb-5 flex items-center gap-4 text-base xl:text-lg">
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

          <div className="mb-5 flex items-center gap-4 text-base xl:text-lg">
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

          <div className="mt-10 flex flex-col items-center">
            <button className="mb-2 rounded-full bg-slate-800 px-8 py-3 text-base uppercase text-white transition-colors duration-200 hover:bg-slate-700 focus:bg-slate-700 focus:outline-none xl:px-12 xl:text-xl">
              Login
            </button>
            <div className="text-base md:text-lg xl:text-lg">
              Or{' '}
              <Link to="/register" className="underline">
                Sign Up
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signin;
