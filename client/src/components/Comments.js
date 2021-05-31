import PostComment from "./PostComment";

function Comments(props) {
    const { data, addComment, id, getPost } = props;
    const post = getPost(id);

    // find answers with the same id as question
    const comment = data.filter(function( com ) {
        return com.id === post._id;
    });

    // const answerAmount = answer.length;

  return (
    <>
      
      <h2>All comments</h2>
          <div className="row">
          <div className="column">
        {
          comment.map( comment =>  
            <div className="answer" key={comment._id}>
              <p>Author: {comment.username}</p>
              <p>Date: {comment.commentDate}</p>
              <p>Comment: {comment.commentText}</p>
            </div>
            )
        }
        </div>
          <div className="column">
            <div className="answer-image"></div>
          </div>
        </div>
      <div className="post-answer">
        <PostComment addComment={addComment} id={post.id} />
      </div>

    </>
  );
}

export default Comments;
