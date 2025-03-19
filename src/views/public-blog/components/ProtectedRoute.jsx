import { Navigate } from 'react-router-dom';
import { fetchUserIsAuthenticated } from '../services/authApi';
import { useQuery } from '@tanstack/react-query';
import Loader from './Loader';

function ProtectedRoute({ children }) {
  const { isLoading, data: userInfo } = useQuery({
    queryKey: ['isAuthenticated'],
    queryFn: fetchUserIsAuthenticated,
    meta: {
      protectedRouteErrorMessage:
        "Couldn't fetch user authentication status",
    },
  });

  if (isLoading) {
    return <Loader text={''} />; // Show loading until the query resolves
  }

  return userInfo.authenticated ? (
    children
  ) : (
    <Navigate replace to="/signin" />
  );
}

export default ProtectedRoute;
