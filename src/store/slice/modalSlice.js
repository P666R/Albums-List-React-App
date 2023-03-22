import { createSlice } from '@reduxjs/toolkit';

export const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    isOpen: false,
  },
  reducers: {
    openModal(state, action) {
      state.isOpen = true;
    },
    closeModal(state, action) {
      state.isOpen = false;
    },
  },
});

// exporting the action creator functions
export const { openModal, closeModal } = modalSlice.actions;
// exporting the combined reducers
export const modalReducer = modalSlice.reducer;
