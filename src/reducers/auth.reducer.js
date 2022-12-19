import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isSignedIn: false,
};

export const authSlice = createSlice({
  name: 'authStatus',
  initialState,
  reducers: {
    signin: (state) => {
      state.isSignedIn = true;
    },
    signout: (state) => {
      state.isSignedIn = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { signin, signout, checkAuth } = authSlice.actions;

export default authSlice.reducer;
