import { useState } from 'react';
import { Link } from '@reach/router';
import AuthService from './AuthService';

function AddPost(props) {

  const API_URL = process.env.REACT_APP_API;
  const authService = new AuthService(`${API_URL}/users/authenticate`);

  const { addPost } = props;

  const username = authService.getUsername();
  const [title, setTitle] = useState('');
  const [topicName, setTopicName] = useState('');


  // Conditional rendering
  return (
    <>
        <h1 className='bold'>Post submission</h1>
          {!authService.loggedIn() ? 
          <div>
            <p>You must be logged in to submit6 a post</p>
            <br />
            <Link to={`/login`} className="login-link">Login</Link>
          </div> : ''}
            <div className='post-box'>
              <label>Post title</label>
              <br />
              <input onChange={(event) => setTitle(event.target.value)} type='text' />
              <br />
              <label>Topic</label>
              <br />
              <select onChange={(event) => setTopicName(event.target.value)}>
                <option value=''>Select your option</option>
                <option value='Food'>Food</option>
                <option value='Politics'>Politics</option>
                <option value='News'>News</option>
                <option value='Gardening'>Gardening</option>
              </select>
            </div>
            <br />
            <button type='button' disabled={topicName === '' || title === '' || !authService.loggedIn()}  onClick={(event) => { addPost(username, title, topicName) }}>Submit your post</button>
    </>
  );
}

export default AddPost;
