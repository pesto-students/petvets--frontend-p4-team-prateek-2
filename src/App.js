import React from 'react';
import { useSelector } from 'react-redux';
import { Home } from './components/Home';

export const App = () => {
  const state = useSelector((state) => state);
  // console.log(state);
  return <Home />;
};
