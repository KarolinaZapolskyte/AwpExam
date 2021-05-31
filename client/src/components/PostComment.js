import { useState } from 'react';

function PostComment(props) {
  const { addComment, id } = props;

  const [username, setUsername] = useState("");
  const [comments, setComment] = useState("");

  // Conditional rendering
  return (
    <>
      <h2>Your comment</h2>
      <div className="comment-box">
        <input onChange={(event) => setUsername(event.target.value)} type="text"/>
        <br />
        <textarea onChange={(event) => setComment(event.target.value)} />
        <br />
      </div>
      <br />
      <button type="button" className="blue" onClick={(event) => { addComment(id, username, comments) }}>Post Your Comment</button>
    </>
  );
}

export default PostComment;
