import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

function Signin() {
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  async function loginUser(userInfo) {
    console.log('userInfo: ', userInfo);

    try {
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

      toast.success('Login successful!');

      auth.login();
      navigate('/home');

      reset();
    } catch (error) {
      toast.error(`${error}`);
    }
  }
  /*
   TODO: 
   - add signin functionality
  */

  return (
    <div className="mx-80 mt-10 text-black dark:text-white">
      <div className="mb-16 text-3xl font-bold">Login</div>
      <form onSubmit={handleSubmit(loginUser)}>
        <div className="mb-5 flex items-center gap-4 text-lg">
          <label htmlFor="" className="basis-20 text-xl">
            Username
          </label>
          <div className="grow text-lg">
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

        <div className="mb-5 flex items-center gap-4 text-lg">
          <label htmlFor="" className="basis-20 text-xl">
            Password
          </label>
          <div className="grow text-lg">
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
          <button className="mb-2 rounded-full bg-slate-800 px-12 py-3 text-xl uppercase text-white transition-colors duration-200 hover:bg-slate-700 focus:bg-slate-700 focus:outline-none">
            Login
          </button>
          <div className="text-lg">
            Or{' '}
            <Link to="/register" className="underline">
              Sign Up
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Signin;
