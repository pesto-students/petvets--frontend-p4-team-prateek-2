import React, { useState, useEffect } from 'react';
import { SignIn } from './Auth/SignIn';
import { onAuthStateChanged } from 'firebase/auth';
import { Home } from './Home/Home';
import { auth } from './Auth/firebase';

export const App = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user !== null) {
        setIsSignedIn(true);
      } else {
        setIsSignedIn(false);
      }
    });
  });

  return isSignedIn ? <Home /> : <SignIn />;
};
