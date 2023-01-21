import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import Loader from './MuiComponents/Loader';

export const ProtectedRoute = ({ children }) => {
  const { authStatus } = useSelector((state) => state);
  const { isSignedIn, getUserLoading } = authStatus;

  if (getUserLoading) return <Loader />;

  if (!isSignedIn) return <Navigate to="/signIn" />;

  return children;
};
