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
        {
          comment.length > 0 ? 
          comment.sort( (a,b) => {return new Date(b.commentDate) - new Date(a.commentDate)}).map( (comment) => 
            <div className='comments' key={comment._id}>
              <Link to={`/users/${comment.username}`}>
                <p className="author"><b>Author:</b> {comment.username}</p>
              </Link>
              <p><b>Comment:</b> {comment.commentText}</p>
              <p><b>Date:</b> {comment.commentDate}</p>
            </div>
            ) : <div><p>No comments to this post</p></div>
        }
      <div className='post-answer'>
      <h2>Your comment</h2>
        {!authService.loggedIn() ? 
          <div>
            <p>You must be logged in to post a comment</p>
            <br />
            <Link to={`/login`} className="login-link">Login</Link>
          </div> : <PostComment addComment={addComment} id={post._id}/> }
      </div>

    </>
  );
}

export default Comments;
