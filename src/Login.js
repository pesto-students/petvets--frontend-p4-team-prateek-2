// Import FirebaseAuth and firebase.
import React, { useEffect, useState } from 'react';
import firebase from 'firebase';

// Configure Firebase.
const config = {
  apiKey: 'AIzaSyBsxlmCMQy1DJgIIGJU8Pdl4_sQjBdFxGY',
  authDomain: 'petvet-36f81.firebaseapp.com',
  projectId: 'petvet-36f81',
  storageBucket: 'petvet-36f81.appspot.com',
  messagingSenderId: '565348669373',
  appId: '1:565348669373:web:84cfe18b23378cab0624d4',
  measurementId: 'G-7134W00JGN',
};
firebase.initializeApp(config);

function SignInScreen() {
  const [isSignedIn, setIsSignedIn] = useState(false); // Local signed-in state.
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Listen to the Firebase Auth state and set the local state.
  useEffect(() => {
    const unregisterAuthObserver = firebase
      .auth()
      .onAuthStateChanged((user) => {
        console.log(user);
        setIsSignedIn(!!user);
      });
    return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
  }, []);

  const handleSignUp = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode === 'auth/weak-password') {
          alert('The password is too weak.');
        } else {
          alert(errorMessage);
        }
        console.log(error);
      });
  };

  const handleSignIn = async () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode === 'auth/wrong-password') {
          alert('Wrong password.');
        } else {
          alert(errorMessage);
        }
        console.log(error);
      });
  };

  const sendEmailVerification = () => {
    firebase
      .auth()
      .currentUser.sendEmailVerification()
      .then(function () {
        // Email Verification sent!
        alert('Email Verification Sent!');
      });
  };

  if (!isSignedIn) {
    return (
      <div>
        <h1>My App</h1>
        <p>Please sign-in:</p>
        <input
          type="text"
          id="email"
          name="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        &nbsp;&nbsp;&nbsp;
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleSignUp}>Sign Up</button>
        <button onClick={handleSignIn}>Sign In</button>
      </div>
    );
  }
  return (
    <div>
      <h1>My App</h1>
      <p>
        {console.log(firebase.auth())}
        Welcome {firebase.auth().currentUser.displayName}! You are now
        signed-in!
      </p>
      <button onClick={() => firebase.auth().signOut()}>Sign-out</button>
      <button onClick={sendEmailVerification}>Verify Email Address</button>
    </div>
  );
}

export default SignInScreen;
