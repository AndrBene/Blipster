function Register() {
  return (
    <div className="mx-80 mt-10 text-black">
      <div className="mb-16 text-3xl font-bold">Register</div>
      {/* <Form method="POST"> */}
      <form>
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
            />
          </div>
        </div>

        <div className="mb-5 flex items-center gap-4 text-lg">
          <label htmlFor="" className="basis-40 text-xl">
            Password
          </label>
          <div className="grow text-lg">
            <input
              type="text"
              required
              className="input"
              placeholder="password"
            />
          </div>
        </div>

        <div className="mb-5 flex items-center gap-4 text-lg">
          <label htmlFor="" className="basis-40 text-xl">
            Confirm password
          </label>
          <div className="grow text-lg">
            <input
              type="text"
              required
              className="input"
              placeholder="confirm password"
            />
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center">
          <button className="mb-2 rounded-full bg-slate-800 px-12 py-3 text-xl uppercase text-white transition-colors duration-200 hover:bg-slate-700 focus:bg-slate-700 focus:outline-none">
            Register
          </button>
        </div>
      </form>
      {/* </Form> */}
    </div>
  );
}

export default Register;
