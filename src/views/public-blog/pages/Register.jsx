import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

function Register() {
  const { register, handleSubmit, reset } = useForm();

  async function registerNewUser(userInfo) {
    try {
      const formData = new FormData();
      formData.append('email', userInfo.email);
      formData.append('username', userInfo.username);
      formData.append('password', userInfo.password);
      formData.append('confirmPassword', userInfo.confirmPassword);
      for (let [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }
      const res = await fetch(
        `http://localhost:3000/api/v1/users/register`,
        {
          method: 'POST',
          body: formData,
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
    <div className="flex justify-center">
      <div className="mt-10 w-2/3 text-black sm:w-3/6 lg:w-1/3 dark:text-white">
        <div className="mb-12 text-xl font-bold md:text-2xl xl:mb-16 xl:text-3xl">
          Register
        </div>
        <form onSubmit={handleSubmit(registerNewUser)}>
          <div className="mb-5 flex items-center gap-4">
            <label
              htmlFor=""
              className="basis-40 text-base md:text-lg xl:text-xl"
            >
              Email
            </label>
            <div className="grow text-base xl:text-lg">
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

          <div className="mb-5 flex items-center gap-4">
            <label
              htmlFor=""
              className="basis-40 text-base md:text-lg xl:text-xl"
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

          <div className="mb-5 flex items-center gap-4">
            <label
              htmlFor=""
              className="basis-40 text-base md:text-lg xl:text-xl"
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

          <div className="mb-5 flex items-center gap-4">
            <label
              htmlFor=""
              className="basis-40 text-base md:text-lg xl:text-xl"
            >
              Confirm password
            </label>
            <div className="grow text-base xl:text-lg">
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
            <button className="mb-2 rounded-full bg-slate-800 px-8 py-3 text-base uppercase text-white transition-colors duration-200 hover:bg-slate-700 focus:bg-slate-700 focus:outline-none xl:px-12 xl:text-xl">
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
