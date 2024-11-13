import { createSlice } from '@reduxjs/toolkit';

// Initial state for the active filter
const initialState = {
  active: 'All', // default value
};

// Create a slice for active state
const activeSlice = createSlice({
  name: 'active',
  initialState,
  reducers: {
    setActive: (state, action) => {
      state.active = action.payload; // update active filter state
    },
  },
});

// Export actions to update the active filter
export const { setActive } = activeSlice.actions;

// Export the reducer to be added to the store
export default activeSlice.reducer;
