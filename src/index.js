import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import { SignUp } from './Auth/SignUp';
import { SignIn } from './Auth/SignIn';
import { ForgotPassword } from './Auth/ForgotPassword';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { store } from './store';
import { Provider } from 'react-redux';
import './index.css';
import { ProtectedRoute } from './ProtectedRoute';
import { UserProfile } from './MuiComponents/UserProfile';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebaseConfig';
import { signin, signout } from './reducers/auth.reducer';
import { FindDoctor } from './Home/FindDoctor';
import { ShowDoctor } from './Home/ShowDoctor';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      // <ProtectedRoute>
      <App />
      // </ProtectedRoute>
    ),
  },
  {
    path: '/userProfile',
    element: (
      // <ProtectedRoute>
      <UserProfile />
      // </ProtectedRoute>s
    ),
  },
  {
    path: '/findDoctor',
    element: (
      // <ProtectedRoute>
      <FindDoctor />
      // </ProtectedRoute>s
    ),
  },
  {
    path: '/findDoctor/:id',
    element: (
      // <ProtectedRoute>
      <ShowDoctor />
      // </ProtectedRoute>s
    ),
  },
  { path: '/signUp', element: <SignUp /> },
  { path: '/signIn', element: <SignIn /> },
  { path: '/forgotPassword', element: <ForgotPassword /> },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));

onAuthStateChanged(auth, (user) => {
  if (user !== null) {
    store.dispatch(signin());
  } else {
    store.dispatch(signout());
  }
  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </React.StrictMode>
  );
});
