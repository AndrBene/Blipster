import { Navigate } from 'react-router-dom';
import { fetchUserIsAuthenticated } from '../services/authApi';
import { useQuery } from '@tanstack/react-query';

function ProtectedRoute({ children }) {
  console.log('ProtectedRoute');
  const { data: isAuthenticated } = useQuery({
    queryKey: ['isAuthenticated'],
    queryFn: fetchUserIsAuthenticated,
    meta: {
      protectedRouteErrorMessage:
        "Couldn't fetch user authentication status",
    },
  });

  console.log('isAuthenticated:', isAuthenticated);

  return isAuthenticated ? (
    children
  ) : (
    <Navigate replace to="/signin" />
  );
}

export default ProtectedRoute;
