import { useState, useEffect } from 'react';
import { Router, Link } from '@reach/router';
import Comments from './Comments'

const API_URL = process.env.REACT_APP_API;

function Post(props) {
  const { id, getPost } = props;
  const post = getPost(id);

  const [comments, setComment] = useState([]);
  const [votes, setVote] = useState([]);
  const [postComment, setPostComment] = useState(0);

  
  useEffect(() => { 
    const fetchData = async () => {
      const url = `${API_URL}/comments`;
      const voteUrl = `${API_URL}/votes`;

      const response = await fetch(url);
      const voteResponse = await fetch(voteUrl);
      const data = await response.json();
      const voteData = await voteResponse.json();
      setComment(data);
      setVote(voteData)
    }; 
    fetchData();
  }, [postComment]); 


  function addComment(id, username, commentText, commentDate) {
    const data = { 
      id: id,
      username: username,
      commentText: commentText,
      commentDate: commentDate
    };

    const postData = async () => {

      setPostComment(p => p + 1); // Refresh data after comment is posted
  
      const url = `${API_URL}/comments`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const reply = await response.json();
      console.log(reply);
    }; 
    postData();
  }

  function addVoteValue(id, voteValue) {
    const data = { 
      id: id,
      voteValue: voteValue
    };

    const postData = async () => {
  
      const url = `${API_URL}/votes`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const reply = await response.json();
      console.log(reply);
    }; 
    postData();
  }

  // filter scores with the same id as question
  let votesValue = votes.filter(function( vote ) {
    return vote.id === post._id;
  });

  // sum of score
  var voteAmount = votesValue.reduce((accum,item) => accum + item.votePoints, 0);
  
  function voteUp() {
    addVoteValue(post._id, 1);
      setPostComment(p => p + 1); // Refresh data after vote is submitted
  }

  function voteDown() {
    addVoteValue(post._id, -1);
      setPostComment(p => p + 1); // Refresh data after vote is submitted
  }

  
    // Conditional rendering
    if (post === undefined) {
      return <p>Nothing here</p>;
    } else return (
      <>
        <div className="row">
          <div className="column voting">
            <svg aria-hidden="true" className="up" width="36" height="36" viewBox="0 0 36 36" onClick={(event) => { voteUp()} }>
                <path d="M2 26h32L18 10 2 26z"></path>
              </svg>
              <p>{voteAmount}</p>
              <svg aria-hidden="true" className="down" width="36" height="36" viewBox="0 0 36 36" onClick={ (event) => {voteDown()} }>
                <path d="M2 10h32L18 26 2 10z"></path>
              </svg>
            </div>
          <div className='column'>
            <div className="post">
              <Link to={`/users/${post.username}`}>
                <p className="author"><b>Author:</b> {post.username}</p>
              </Link>
              <div className="post-summary">
                <h2><b>Post:</b> {post.title}</h2>
                <p><b>Post topic:</b> {post.topicName}</p>
                <p><b>Date:</b> {post.submitDate}</p>
              </div>
            </div>
            <div className='comments'>
              <Router>
                <Comments path='/' data={comments} addComment={addComment} getPost={getPost} />
              </Router>
            </div>
          </div>
        </div>
      </>
    );
  }
  
  export default Post;
  