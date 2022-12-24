import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isSignedIn: false,
  userId: '',
  userData: {},
};

export const authSlice = createSlice({
  name: 'authStatus',
  initialState,
  reducers: {
    signin: (state, data) => ({
      ...state,
      isSignedIn: true,
      userId: data.payload,
    }),
    signout: (state) => {
      state.isSignedIn = false;
    },
    storeUserData: (state, data) => {
      state.userData = data.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { signin, signout, storeUserData } = authSlice.actions;

export default authSlice.reducer;
