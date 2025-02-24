import { Navigate } from 'react-router-dom';
import { fetchUserIsAuthenticated } from '../services/authApi';
import { useQuery } from '@tanstack/react-query';
import Loader from './Loader';

function ProtectedRoute({ children }) {
  console.log('ProtectedRoute');
  const { isLoading, data: isAuthenticated } = useQuery({
    queryKey: ['isAuthenticated'],
    queryFn: fetchUserIsAuthenticated,
    meta: {
      protectedRouteErrorMessage:
        "Couldn't fetch user authentication status",
    },
  });

  console.log('isAuthenticated:', isAuthenticated);

  if (isLoading) {
    return <Loader text={''} />; // Show loading until the query resolves
  }

  return isAuthenticated ? (
    children
  ) : (
    <Navigate replace to="/signin" />
  );
}

export default ProtectedRoute;
