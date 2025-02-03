import { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext({
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
});

function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = function () {
    setIsLoggedIn(true);
  };

  const logout = function () {
    setIsLoggedIn(false);
  };

  useEffect(function () {
    async function IsLoggedIn() {
      const res = await fetch(
        `http://localhost:3000/api/v1/users/is-logged-in`,
        {
          credentials: 'include',
        },
      );

      const json = await res.json();

      if (json.authenticated) {
        setIsLoggedIn(true);
      }
    }

    IsLoggedIn();
  }, []);

  return (
    <AuthContext.Provider
      value={{ isLoggedIn: isLoggedIn, login: login, logout: logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
