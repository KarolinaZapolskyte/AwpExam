import { Link } from '@reach/router';
import PostComment from './PostComment';
import AuthService from './AuthService';

const API_URL = process.env.REACT_APP_API;
const authService = new AuthService(`${API_URL}/users/authenticate`);

function Comments(props) {
    const { data, addComment, id, getPost } = props;
    const post = getPost(id);

    // find comments with the same id as question
    const comment = data.filter(function( com ) {
        return com.id === post._id;
    });

  return (
    <>
      
      <h2>All comments</h2>
          <div className='row'>
          <div className='column'>
        {
          comment.map( comment =>  
            <div className='answer' key={comment._id}>
              <Link to={`/users/${comment.username}`}>
                <p>Author: {comment.username}</p>
              </Link>
              <p>Date: {comment.commentDate}</p>
              <p>Comment: {comment.commentText}</p>
            </div>
            )
        }
        </div>
          <div className='column'>
            <div className='answer-image'></div>
          </div>
        </div>
      <div className='post-answer'>
        {!authService.loggedIn() ? 
          <div>
            <p>You must be logged in to post a comment</p>
            <Link to={`/login`}>Login</Link>
          </div> : <PostComment addComment={addComment} id={post._id}/> }
      </div>

    </>
  );
}

export default Comments;
