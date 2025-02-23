import { Navigate } from 'react-router-dom';
import { fetchUserIsAuthenticated } from '../services/authApi';
import { useQuery } from '@tanstack/react-query';

function ProtectedRoute({ children }) {
  const { data: isAuthenticated } = useQuery({
    queryKey: ['isAuthenticated'],
    queryFn: fetchUserIsAuthenticated,
    meta: {
      protectedRouteErrorMessage:
        "Couldn't fetch user authentication status",
    },
  });

  return isAuthenticated ? (
    children
  ) : (
    <Navigate replace to="/signin" />
  );
}

export default ProtectedRoute;
