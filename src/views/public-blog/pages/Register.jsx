import { useState } from 'react';

function Register() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();

    console.log('hanldesubmit');

    fetch(`http://localhost:3000/api/v1/users/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Sending JSON data
      },
      body: JSON.stringify({
        email: email,
        username: username,
        password: password,
        confirmPassword: confirmPassword,
      }),
    });
  }

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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center">
          <button
            className="mb-2 rounded-full bg-slate-800 px-12 py-3 text-xl uppercase text-white transition-colors duration-200 hover:bg-slate-700 focus:bg-slate-700 focus:outline-none"
            onClick={handleSubmit}
          >
            Register
          </button>
        </div>
      </form>
      {/* </Form> */}
    </div>
  );
}

export default Register;
