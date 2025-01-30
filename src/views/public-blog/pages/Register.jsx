import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

function Register() {
  const { register, handleSubmit, reset } = useForm();

  async function registerNewUser(userInfo) {
    try {
      const res = await fetch(
        `http://localhost:3000/api/v1/users/register`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json', // Sending JSON data
          },
          // body: JSON.stringify({ info: userInfo }),
          // body: { info: JSON.stringify(userInfo) },
          body: JSON.stringify({ info: JSON.stringify(userInfo) }),
        },
      );

      const json = await res.json();

      if (json.status === 'error') {
        // if (!res.ok) {
        throw new Error(json.message);
      }

      toast.success('User created successfully!!');

      reset();
    } catch (error) {
      toast.error(`${error}`);
    }
  }
  return (
    <div className="mx-80 mt-10 text-black">
      <div className="mb-16 text-3xl font-bold">Register</div>
      <form onSubmit={handleSubmit(registerNewUser)}>
        <div className="mb-5 flex items-center gap-4 text-lg">
          <label htmlFor="" className="basis-40 text-xl">
            Email
          </label>
          <div className="grow text-lg">
            <input
              placeholder="email"
              className="input"
              type="text"
              required
              id="email"
              {...register('email')}
            />
          </div>
        </div>

        <div className="mb-5 flex items-center gap-4 text-lg">
          <label htmlFor="" className="basis-40 text-xl">
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
          <label htmlFor="" className="basis-40 text-xl">
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

        <div className="mb-5 flex items-center gap-4 text-lg">
          <label htmlFor="" className="basis-40 text-xl">
            Confirm password
          </label>
          <div className="grow text-lg">
            <input
              type="password"
              required
              className="input"
              placeholder="confirm password"
              id="confirmPassword"
              {...register('confirmPassword')}
            />
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center">
          <button className="mb-2 rounded-full bg-slate-800 px-12 py-3 text-xl uppercase text-white transition-colors duration-200 hover:bg-slate-700 focus:bg-slate-700 focus:outline-none">
            Register
          </button>
        </div>
      </form>
    </div>
  );
}

export default Register;
