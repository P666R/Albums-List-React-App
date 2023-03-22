import { createSlice } from '@reduxjs/toolkit';
// local storage functionality
const albumsApi =
  localStorage.getItem('albumsApi') !== null
    ? JSON.parse(localStorage.getItem('albumsApi'))
    : [];

export const albumsApiSlice = createSlice({
  name: 'albumsApi',
  initialState: {
    albumsApi: albumsApi,
    targetApi: 0,
  },
  reducers: {
    setTargetApi(state, action) {
      state.targetApi = action.payload;
    },
    addAlbumApi(state, action) {
      state.albumsApi = action.payload;
      // updating local storage to reflect the current state
      localStorage.setItem(
        'albumsApi',
        JSON.stringify(state.albumsApi.map((album) => album))
      );
    },
    removeAlbumApi(state, action) {
      const updated = state.albumsApi.filter((album) => {
        return album.id !== action.payload;
      });
      state.albumsApi = updated;
      // updating local storage to reflect the current state
      localStorage.setItem(
        'albumsApi',
        JSON.stringify(state.albumsApi.map((album) => album))
      );
    },
    editAlbumApi(state, action) {
      const updated = state.albumsApi.map((album) => {
        if (album.id === action.payload.id) {
          return {
            ...album,
            title: action.payload.title,
            userId: action.payload.userId,
          };
        }
        return album;
      });
      // updating local storage to reflect the current state
      state.albumsApi = updated;
      localStorage.setItem(
        'albumsApi',
        JSON.stringify(state.albumsApi.map((album) => album))
      );
    },
  },
});

// exporting the action creator functions
export const { setTargetApi, addAlbumApi, removeAlbumApi, editAlbumApi } =
  albumsApiSlice.actions;
//  exporting the combined reducer
export const albumsApiReducer = albumsApiSlice.reducer;
