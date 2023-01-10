import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isSidebarOpen: false,
  activeStep: 0,
};

export const navSlice = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    openSidebar: (state) => {
      state.isSidebarOpen = true;
    },
    closeSidebar: (state) => {
      state.isSidebarOpen = false;
    },
    nextStepper: (state) => {
      const newActiveStep = state.activeStep + 1;
      if (newActiveStep > 2) {
        state.activeStep = 0;
      } else {
        state.activeStep = newActiveStep;
      }
    },
    prevStepper: (state) => {
      state.activeStep = state.activeStep - 1;
    },
    setStepper: (state, data) => {
      state.activeStep = data.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  openSidebar,
  closeSidebar,
  nextStepper,
  prevStepper,
  setStepper,
} = navSlice.actions;

export default navSlice.reducer;
