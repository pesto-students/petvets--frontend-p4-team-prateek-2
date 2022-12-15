import React from 'react';
import { auth } from '../App';
import { signOut } from 'firebase/auth';
import { redirect } from 'react-router-dom';

export const Home = () => {
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        redirect('/signIn');
        console.log('Sign out successfull');
      })
      .catch((error) => {
        console.log('Sign out error');
      });
  };
  return (
    <>
      <div>You are logged in</div>
      <button onClick={handleSignOut}>Sign-out</button>
    </>
  );
};
