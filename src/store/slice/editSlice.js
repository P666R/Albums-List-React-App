import { createSlice } from '@reduxjs/toolkit';

export const editSlice = createSlice({
  name: 'edit',
  initialState: {
    title: '',
    userId: 0,
  },
  reducers: {
    editTitle(state, action) {
      state.title = action.payload;
    },
    editUserId(state, action) {
      state.userId = action.payload;
    },
  },
});

// exporting the action creator functions
export const { editTitle, editUserId } = editSlice.actions;
// exporting the combined reducers
export const editReducer = editSlice.reducer;
