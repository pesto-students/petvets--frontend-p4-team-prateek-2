import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import { SignUp } from './Auth/SignUp';
import { SignIn } from './Auth/SignIn';
import { ForgotPassword } from './Auth/ForgotPassword';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  { path: '/signUp', element: <SignUp /> },
  { path: '/signIn', element: <SignIn /> },
  { path: '/forgotPassword', element: <ForgotPassword /> },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
