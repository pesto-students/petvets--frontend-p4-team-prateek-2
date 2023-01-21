import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/auth.reducer';
import navReducer from './reducers/navigation.reducer';

export const store = configureStore({
  reducer: {
    authStatus: authReducer,
    navStatus: navReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredPaths: ['authStatus.userData.profileDetails.metadata'],
      },
    }),
});
