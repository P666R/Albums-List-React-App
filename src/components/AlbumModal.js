import { useDispatch, useSelector } from 'react-redux';
import {
  closeModal,
  editTitle,
  editUserId,
  editAlbumApi,
  editAlbumLocal,
  setTargetLocal,
  setTargetApi,
  useUpdateAlbumMutation,
} from '../store';

function AlbumModal() {
  const dispatch = useDispatch();

  // RTK Query hook for PUT request
  const [updateMutation] = useUpdateAlbumMutation();

  // accesing state from redux store
  const { albumsLocalToggle, albumsLocalId, albumsApiId, title, userId } =
    useSelector((state) => {
      return {
        albumsLocalToggle: state.albumsLocal.targetLocal,
        albumsLocalId: state.albumsLocal.targetLocal.id,
        albumsApiId: state.albumsApi.targetApi.id,
        title: state.edit.title,
        userId: state.edit.userId,
      };
    });

  const handleTitleChange = (event) => {
    // dispatching action object
    dispatch(editTitle(event.target.value));
  };

  const handleUserIdChange = (event) => {
    // dispatching action object
    dispatch(editUserId(parseInt(event.target.value) || 0));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (albumsLocalToggle !== 0) {
      // dispatching action objects to update local storage and reset targetLocal piece of state
      dispatch(editAlbumLocal({ albumsLocalId, title, userId }));
      dispatch(setTargetLocal(0));
    } else {
      // calling mutation function to initiate PUT request
      const { data } = await updateMutation({ id: albumsApiId, title, userId });
      // dispatching action objects on successful PUT request with the response from the request as payload
      // dispatching action object to reset targetApi piece of state
      dispatch(editAlbumApi(data));
      dispatch(setTargetApi(0));
    }
    // dispatching action object to reset input fields and close modal on submit
    dispatch(editTitle(''));
    dispatch(editUserId(0));
    dispatch(closeModal());
  };

  return (
    <div className="modal-container">
      <form className="modal" onSubmit={handleSubmit}>
        <div>
          <h3>EDIT ALBUM</h3>
          <div>
            <h4>Title</h4>
            <input value={title} onChange={handleTitleChange} />
          </div>
          <div>
            <h4>UserId</h4>
            <input
              value={userId || ''}
              onChange={handleUserIdChange}
              type="number"
            />
          </div>
        </div>
        <div className="btn-container">
          <button className="btn">Submit</button>
          <button className="btn" onClick={() => dispatch(closeModal())}>
            Close
          </button>
        </div>
      </form>
    </div>
  );
}

export default AlbumModal;
