import { createSlice } from '@reduxjs/toolkit';

export const formSlice = createSlice({
  name: 'form',
  initialState: {
    title: '',
    userId: 0,
  },
  reducers: {
    changeTitle(state, action) {
      state.title = action.payload;
    },
    changeUserId(state, action) {
      state.userId = action.payload;
    },
  },
});

// exporting the action creator functions
export const { changeTitle, changeUserId } = formSlice.actions;
// exporting the combined reducers
export const formReducer = formSlice.reducer;
