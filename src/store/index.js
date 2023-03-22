// single source for all our components for their required action creators, RTX query hooks
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import {
  formSlice,
  formReducer,
  changeTitle,
  changeUserId,
} from './slice/formSlice';
import {
  setTargetLocal,
  addAlbumLocal,
  removeAlbumLocal,
  editAlbumLocal,
  albumsLocalReducer,
  albumsLocalSlice,
} from './slice/albumsLocalSlice';
import {
  setTargetApi,
  addAlbumApi,
  removeAlbumApi,
  editAlbumApi,
  albumsApiReducer,
  albumsApiSlice,
} from './slice/albumsApiSlice';
import {
  openModal,
  closeModal,
  modalReducer,
  modalSlice,
} from './slice/modalSlice';
import {
  editTitle,
  editUserId,
  editReducer,
  editSlice,
} from './slice/editSlice';
import { albumsApi } from './apis/albumsApi';

// redux store creation
export const store = configureStore({
  // adding combined reducers to store
  reducer: {
    [editSlice.name]: editReducer,
    [modalSlice.name]: modalReducer,
    [formSlice.name]: formReducer,
    [albumsLocalSlice.name]: albumsLocalReducer,
    [albumsApiSlice.name]: albumsApiReducer,
    [albumsApi.reducerPath]: albumsApi.reducer,
  },
  // middleware to add albumsApi from RTK query
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(albumsApi.middleware);
  },
});

setupListeners(store.dispatch);

// re-exporting the action creators
export {
  changeTitle,
  changeUserId,
  setTargetLocal,
  addAlbumLocal,
  removeAlbumLocal,
  editAlbumLocal,
  setTargetApi,
  addAlbumApi,
  removeAlbumApi,
  editAlbumApi,
  openModal,
  closeModal,
  editTitle,
  editUserId,
};

// re-exporting the RTK query hooks
export {
  useFetchAlbumsQuery,
  useAddAlbumMutation,
  useUpdateAlbumMutation,
  useRemoveAlbumMutation,
} from './apis/albumsApi';
