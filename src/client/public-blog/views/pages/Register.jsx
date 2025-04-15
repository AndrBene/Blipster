import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import ViewsWrapper from '../components/ViewsWrapper';

function Register() {
  const { register, handleSubmit, reset, formState } = useForm();
  const { errors } = formState;
  const navigate = useNavigate();

  async function registerNewUser(userInfo) {
    try {
      const formData = new FormData();
      formData.append('email', userInfo.email);
      formData.append('username', userInfo.username);
      formData.append('password', userInfo.password);
      formData.append('confirmPassword', userInfo.confirmPassword);

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

      toast.dismiss();
      toast.success('User created successfully!!');

      reset();

      navigate('/signin');
    } catch (error) {
      toast.dismiss();
      toast.error(`${error}`);
    }
  }

  return (
    <ViewsWrapper>
      <div className="sticky top-0 bg-white pb-2 text-xl font-bold md:text-2xl xl:text-3xl dark:bg-slate-950">
        Register
      </div>
      <form
        onSubmit={handleSubmit(registerNewUser)}
        className="flex grow flex-col justify-between gap-y-10 xl:grow-0"
      >
        <div className="flex flex-col gap-y-5">
          <div className="flex items-center gap-4">
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
                id="email"
                {...register('email', {
                  required: 'Email is required',
                })}
              />
            </div>
          </div>
          <div className="flex gap-4">
            <div className="basis-40"></div>
            {errors?.email?.message && (
              <div className="text-red-500 xl:text-lg">
                {errors.email.message}
              </div>
            )}
          </div>

          <div className="flex items-center gap-4">
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
                id="username"
                {...register('username', {
                  required: 'Username is required',
                })}
              />
            </div>
          </div>
          <div className="flex gap-4">
            <div className="basis-40"></div>
            {errors?.username?.message && (
              <div className="text-red-500 xl:text-lg">
                {errors.username.message}
              </div>
            )}
          </div>

          <div className="flex items-center gap-4">
            <label
              htmlFor=""
              className="basis-40 text-base md:text-lg xl:text-xl"
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
          </div>
          <div className="flex gap-4">
            <div className="basis-40"></div>
            {errors?.password?.message && (
              <div className="text-red-500 xl:text-lg">
                {errors.password.message}
              </div>
            )}
          </div>

          <div className="flex items-center gap-4">
            <label
              htmlFor=""
              className="basis-40 text-base md:text-lg xl:text-xl"
            >
              Confirm password
            </label>
            <div className="grow text-base xl:text-lg">
              <input
                type="password"
                className="input"
                placeholder="confirm password"
                id="confirmPassword"
                {...register('confirmPassword', {
                  required: 'Confirm password is required',
                })}
              />
            </div>
          </div>
          <div className="flex gap-4">
            <div className="basis-40"></div>
            {errors?.confirmPassword?.message && (
              <div className="text-red-500 xl:text-lg">
                {errors.confirmPassword.message}
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col items-center xl:mt-10">
          <button className="rounded-full bg-slate-800 px-8 py-3 text-base uppercase text-white transition-colors duration-200 hover:bg-slate-700 focus:bg-slate-700 focus:outline-none xl:px-12 xl:text-xl dark:bg-white dark:text-black dark:hover:bg-slate-200">
            Register
          </button>
        </div>
      </form>
    </ViewsWrapper>
  );
}

export default Register;
