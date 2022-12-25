import { onAuthStateChanged } from 'firebase/auth';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { App } from './App';
import { FindDoctor } from './components/FindDoctor';
import { ForgotPassword } from './components/ForgotPassword';
import { ShowDoctor } from './components/ShowDoctor';
import { SignIn } from './components/SignIn';
import { SignUp } from './components/SignUp';
import { auth } from './firebaseConfig';
import './index.css';
import { UserProfile } from './muiComponents/UserProfile';
import { ProtectedRoute } from './ProtectedRoute';
import { signin, signout } from './reducers/auth.reducer';
import { store } from './store';

export const queryClient = new QueryClient();

const router = createBrowserRouter([
  { path: '/userSignUp', element: <SignUp role="user" /> },
  { path: '/doctorSignUp', element: <SignUp role="doctor" /> },
  { path: '/signIn', element: <SignIn /> },
  { path: '/forgotPassword', element: <ForgotPassword /> },
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <App />
      </ProtectedRoute>
    ),
  },
  {
    path: '/userProfile',
    element: (
      <ProtectedRoute>
        <UserProfile />
      </ProtectedRoute>
    ),
  },
  {
    path: '/findDoctor',
    element: (
      <ProtectedRoute>
        <FindDoctor />
      </ProtectedRoute>
    ),
  },
  {
    path: '/findDoctor/:id',
    element: (
      <ProtectedRoute>
        <ShowDoctor />
      </ProtectedRoute>
    ),
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));

onAuthStateChanged(auth, (user) => {
  if (user !== null) {
    store.dispatch(signin(user.uid));
  } else {
    store.dispatch(signout());
  }
  root.render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <RouterProvider router={router} />
        </Provider>
      </QueryClientProvider>
    </React.StrictMode>
  );
});
