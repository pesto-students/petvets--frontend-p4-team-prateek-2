import React, { useEffect } from 'react';
import { useQuery } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { getUserAPI } from './actions/users.actions';
import { storeUserData } from './reducers/auth.reducer';

export const ProtectedRoute = ({ children }) => {
  const { authStatus } = useSelector((state) => state);
  const dispatch = useDispatch();

  const { data: userDetails } = useQuery('getUserDetails', () =>
    getUserAPI(authStatus.userId)
  );

  useEffect(() => {
    if (userDetails !== undefined) dispatch(storeUserData(userDetails));
  }, [userDetails, dispatch]);

  if (!authStatus.isSignedIn) {
    return <Navigate to="/signIn" />;
  }

  return children;
};
