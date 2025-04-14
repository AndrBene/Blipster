import { Navigate, useLocation } from 'react-router-dom';
import { fetchUserIsAuthenticated } from '../services/authApi';
import { useQuery } from '@tanstack/react-query';
import Loader from './Loader';

function ProtectedRoute({ children }) {
  const location = useLocation();
  const {
    isFetching,
    isError,
    data: userInfo,
  } = useQuery({
    queryKey: ['isAuthenticated'],
    queryFn: fetchUserIsAuthenticated,
    meta: {
      protectedRouteErrorMessage:
        "Couldn't fetch user authentication status",
    },
  });

  if (isError) {
    return <Navigate to="/home?page=1" />;
  }

  if (isFetching) {
    return <Loader text={''} />; // Show loading until the query resolves
  }

  return userInfo?.authenticated ? (
    children
  ) : (
    <Navigate to="/signin" state={{ from: location.pathname }} />
  );
}

export default ProtectedRoute;
