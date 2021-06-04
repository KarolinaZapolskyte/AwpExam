import { useState } from 'react';
import AuthService from './AuthService';

function PostComment(props) {

  const API_URL = process.env.REACT_APP_API;
  const authService = new AuthService(`${API_URL}/users/authenticate`);

  const { addComment, id } = props;

  console.log(id);

  const [comments, setComment] = useState('');

  const username = authService.getUsername();

  // Conditional rendering
  return (
    <>
      <div className='comment-box'>
        <textarea onChange={(event) => setComment(event.target.value)} />
        <br />
      </div>
      <br />
      <button type='button' className='blue' onClick={(event) => { addComment(id, username, comments)}}>Post Your Comment</button>
    </>
  );
}

export default PostComment;
