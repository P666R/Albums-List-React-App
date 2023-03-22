import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// creating RTK query API service
export const albumsApi = createApi({
  reducerPath: 'albumApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://jsonplaceholder.typicode.com',
  }),
  endpoints(builder) {
    return {
      fetchAlbums: builder.query({
        query: () => {
          return {
            url: '/albums',
            method: 'GET',
          };
        },
      }),
      addAlbum: builder.mutation({
        query: (album) => {
          return {
            url: '/albums',
            method: 'POST',
            body: {
              title: album.title,
              userId: album.userId,
            },
          };
        },
      }),
      updateAlbum: builder.mutation({
        query: (album) => {
          return {
            url: `/albums/${album.id}`,
            method: 'PUT',
            body: {
              title: album.title,
              userId: album.userId,
            },
          };
        },
      }),
      removeAlbum: builder.mutation({
        query: (id) => {
          return {
            url: `/albums/${id}`,
            method: 'DELETE',
          };
        },
      }),
    };
  },
});

// exporting the automatically generated hooks by RTK query for albumsApi
export const {
  useFetchAlbumsQuery,
  useAddAlbumMutation,
  useUpdateAlbumMutation,
  useRemoveAlbumMutation,
} = albumsApi;
