import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  useFetchAlbumsQuery,
  useRemoveAlbumMutation,
  addAlbumApi,
  removeAlbumApi,
  removeAlbumLocal,
  setTargetApi,
  setTargetLocal,
  openModal,
} from '../store';
import AlbumModal from './AlbumModal';

function AlbumsList() {
  // useDispatch hook to access dispatch function from redux store
  const dispatch = useDispatch();
  // calling the query hook from RTK query for GET request
  const { data, error, isLoading, isSuccess } = useFetchAlbumsQuery();
  // calling the mutation hook from RTK query
  const [removeMutation] = useRemoveAlbumMutation();

  // accesing redux store
  const { isOpen, albumsLocalData, albumsApiData } = useSelector((state) => {
    // returning part of state we need
    return {
      albumsLocalData: state.albumsLocal.albumsLocal,
      albumsApiData: state.albumsApi.albumsApi,
      isOpen: state.modal.isOpen,
    };
  });

  // local storage funtionality
  const albumsApi =
    localStorage.getItem('albumsApi') !== null
      ? JSON.parse(localStorage.getItem('albumsApi'))
      : [];

  useEffect(() => {
    if (albumsApi.length === 0 && isSuccess) {
      dispatch(addAlbumApi(data));
    }
  }, [data, dispatch, isSuccess, albumsApi.length]);

  const handleDeleteLocal = async (album) => {
    // mutation function for DELETE request with argument required to construct the specific url in the query callback function
    await removeMutation(album.id);
    // dispatch action creator with payload
    dispatch(removeAlbumLocal(album.id));
  };

  const handleDeleteApi = async (album) => {
    await removeMutation(album.id);
    dispatch(removeAlbumApi(album.id));
  };

  // dispatch action creator to open modal and update targeted album for editing
  const handleEditLocal = (album) => {
    dispatch(openModal());
    dispatch(setTargetLocal(album));
  };
  // dispatch action creator to open modal and update targeted album for editing
  const handleEditApi = (album) => {
    dispatch(openModal());
    dispatch(setTargetApi(album));
  };

  const renderedLocalContent = albumsLocalData.map((album) => {
    return (
      <article className="card" key={album.id}>
        <h4>
          Title: {album.title} <br /> UserId: {album.userId}
        </h4>
        <div className="btn-container">
          <button className="btn" onClick={() => handleEditLocal(album)}>
            Edit
          </button>
          <button className="btn" onClick={() => handleDeleteLocal(album)}>
            Delete
          </button>
        </div>
      </article>
    );
  });

  let renderedApiContent;
  // isloading true if query is currently loading for the first time, and has no data yet
  if (isLoading) {
    renderedApiContent = (
      <div>
        <h3>Loading content...</h3>
      </div>
    );
    // error result if error occured during request
  } else if (error) {
    renderedApiContent = (
      <div>
        <h3>Error while fetching...</h3>
      </div>
    );
  } else {
    // latest data returned from the server successfully
    renderedApiContent = albumsApiData.map((album) => {
      return (
        <div className="card" key={album.id}>
          <h4>
            Title: {album.title} <br /> UserId: {album.userId}
          </h4>
          <div className="btn-container">
            <button className="btn" onClick={() => handleEditApi(album)}>
              Edit
            </button>
            <button className="btn" onClick={() => handleDeleteApi(album)}>
              Delete
            </button>
          </div>
        </div>
      );
    });
  }

  return (
    <section className="con-display">
      <div className="container">
        {renderedLocalContent}
        {renderedApiContent}
        {isOpen && (
          <div
            className={`${
              isOpen ? 'modal-overlay show-modal' : 'modal-overlay'
            }`}
          >
            <AlbumModal />
          </div>
        )}
      </div>
    </section>
  );
}

export default AlbumsList;
