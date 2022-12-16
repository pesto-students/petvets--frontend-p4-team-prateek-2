import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isSidebarOpen: false,
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
  },
});

// Action creators are generated for each case reducer function
export const { openSidebar, closeSidebar } = navSlice.actions;

export default navSlice.reducer;
