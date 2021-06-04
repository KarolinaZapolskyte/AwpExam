import { Link } from '@reach/router';

function Profile(props) {
  const { data, comments, username, getProfile } = props;
  const profile = getProfile(username);

  let findPostsByProfile = data.filter(function( post ) {
    return post.username === username;
  });

  let findCommentsByProfile = comments.filter(function( comment ) {
    return comment.username === username;
  });

  console.log(comments);
  
    // Conditional rendering
    if (profile === undefined) {
      return <p>Nothing here</p>;
    } else return (
      <>
        <div>
            <h1>Profile: {username}</h1>
            <div>
                <h2>All posts</h2>
                {
          findPostsByProfile.length > 0 ? 
          findPostsByProfile.map( (post) => {
              return <div className='post-summary' key={post._id}>
                  <Link to={`/post/${post._id}`}>
                  <h2>Title: {post.title}</h2>
                  <p>Topic: {post.topicName}</p>
                  <p>Date: {post.submitDate}</p>
                  </Link>
          </div>}) : <div><h2>This profile didn't post anything</h2></div>
        }
            </div>
            <div>
                <h2>All comments</h2>
                {
          findCommentsByProfile.length > 0 ? 
          findCommentsByProfile.map( (comment) => {
              return <div className='post-summary' key={comment._id}>
                  <Link to={`/post/${comment.id}`}>
                  <h2>Title: {comment.commentText}</h2>
                  <p>Date: {comment.commentDate}</p>
                  </Link>
          </div>}) : <div><h2>This profile didn't write any comments</h2></div>
        }
            </div>
        </div>
      </>
    );
  }
  
  export default Profile;
  