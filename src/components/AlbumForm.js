import { useDispatch, useSelector } from 'react-redux';
import {
  changeTitle,
  changeUserId,
  useAddAlbumMutation,
  addAlbumLocal,
} from '../store';

// local storage functionality
const albums =
  localStorage.getItem('albumsLocal') !== null
    ? JSON.parse(localStorage.getItem('albumsLocal'))
    : [];

function AlbumForm() {
  const dispatch = useDispatch();

  // accessing state from redux store
  const { title, userId } = useSelector((state) => {
    return {
      title: state.form.title,
      userId: state.form.userId,
    };
  });

  // RTK Query hook for POST request
  const [addAlbumApi] = useAddAlbumMutation();

  const handleTitleChange = (e) => {
    // dispatching action object
    dispatch(changeTitle(e.target.value));
  };

  const handleUserIdChange = (e) => {
    // dispatching action object
    dispatch(changeUserId(parseInt(e.target.value) || 0));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // calling mutation function to initiate POST request
    const { data } = await addAlbumApi({ title, userId });
    // adding the response from POST request to local storage
    albums.unshift(data);
    localStorage.setItem('albumsLocal', JSON.stringify(albums));
    // dispatching action objects to update local storage and reset the input fields
    dispatch(addAlbumLocal(data));
    dispatch(changeTitle(''));
    dispatch(changeUserId(0));
  };

  return (
    <section className="section-center">
      <form className="con-form" onSubmit={handleSubmit}>
        <h3 className="title">ALBUMS LIST REACT APP</h3>
        <div className="form-control">
          <h4>Title</h4>
          <input
            className="alb-form"
            value={title}
            onChange={handleTitleChange}
          />
          <h4>UserId</h4>
          <input
            className="alb-form"
            value={userId || ''}
            onChange={handleUserIdChange}
            type="number"
          />
          <button className="submit-btn">+ALBUM</button>
        </div>
      </form>
    </section>
  );
}

export default AlbumForm;
