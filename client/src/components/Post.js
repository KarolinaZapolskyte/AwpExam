import { useState, useEffect } from 'react';
import { Router } from "@reach/router";
import Comments from './Comments'

const API_URL = process.env.REACT_APP_API;

function Post(props) {
    const { id, getPost } = props;
  const post = getPost(id);

  const [comments, setComment] = useState([]);


  useEffect(() => { 
    const fetchData = async () => {
      const url = `${API_URL}/comments`;

      const response = await fetch(url);
      const data = await response.json();
      setComment(data);
    }; 
    fetchData();
  }, []); 


  function addComment(username, commentText, commentDate) {
    const data = { 
      id: post._id,
      username: username,
      commentText: commentText,
      commentDate: commentDate
    };

    const postData = async () => {
  
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

  
    // Conditional rendering
    if (post === undefined) {
      return <p>Nothing here</p>;
    } else return (
      <>
        <div className="column">
          <h3>Post: {post.title}</h3>
          <p>Post topic: {post.topicName}</p>
          <p>Author: {post.username}</p>
          <p>Date: {post.submitDate}</p>
        </div>
          <div className="comments">
        <Router>
          <Comments path="/" data={comments.reverse()} addComment={addComment} getPost={getPost} />
        </Router>
          </div>
      </>
    );
  }
  
  export default Post;
  