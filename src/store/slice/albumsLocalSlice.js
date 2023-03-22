import { createSlice, nanoid } from '@reduxjs/toolkit';
// local storage functionality
const albumsLocal =
  localStorage.getItem('albumsLocal') !== null
    ? JSON.parse(localStorage.getItem('albumsLocal'))
    : [];

export const albumsLocalSlice = createSlice({
  name: 'albumsLocal',
  initialState: {
    albumsLocal: albumsLocal,
    targetLocal: 0,
  },
  reducers: {
    setTargetLocal(state, action) {
      state.targetLocal = action.payload;
    },
    addAlbumLocal(state, action) {
      state.albumsLocal.unshift({
        title: action.payload.title,
        userId: action.payload.userId,
        id: nanoid(),
      });
      // updating local storage to reflect the current state
      localStorage.setItem(
        'albumsLocal',
        JSON.stringify(state.albumsLocal.map((album) => album))
      );
    },
    removeAlbumLocal(state, action) {
      const updated = state.albumsLocal.filter((album) => {
        return album.id !== action.payload;
      });
      state.albumsLocal = updated;
      // updating local storage to reflect the current state
      localStorage.setItem(
        'albumsLocal',
        JSON.stringify(state.albumsLocal.map((album) => album))
      );
    },
    editAlbumLocal(state, action) {
      const updated = state.albumsLocal.map((album) => {
        if (album.id === action.payload.albumsLocalId) {
          return {
            ...album,
            title: action.payload.title,
            userId: action.payload.userId,
          };
        }
        return album;
      });
      state.albumsLocal = updated;
      // updating local storage to reflect the current state
      localStorage.setItem(
        'albumsLocal',
        JSON.stringify(state.albumsLocal.map((album) => album))
      );
    },
  },
});

// exporting the action creator functions
export const {
  setTargetLocal,
  addAlbumLocal,
  removeAlbumLocal,
  editAlbumLocal,
} = albumsLocalSlice.actions;
// exporting the combined reducers
export const albumsLocalReducer = albumsLocalSlice.reducer;
