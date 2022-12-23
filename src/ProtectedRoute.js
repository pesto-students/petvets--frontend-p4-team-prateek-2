import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const ProtectedRoute = ({ children }) => {
  const { authStatus } = useSelector((state) => state);

  if (!authStatus.isSignedIn) {
    return <Navigate to="/signIn" />;
  }
  return children;
};
