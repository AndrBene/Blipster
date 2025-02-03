import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function ProtectedRoute({ children }) {
  const auth = useContext(AuthContext);

  return auth.isLoggedIn ? (
    children
  ) : (
    <Navigate replace to="/signin" />
  );
}

export default ProtectedRoute;
