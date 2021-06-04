import { useState, useEffect } from 'react';
import { Link } from '@reach/router';
import { Router } from '@reach/router';
import Comments from './Comments'

const API_URL = process.env.REACT_APP_API;

function Profile(props) {
  const { data, comments, username, getProfile } = props;
  const profile = getProfile(username);

  let findPostsByProfile = data.filter(function( post ) {
    return post.username === username;
  });


  console.log(comments);
  let findCommentsByProfile = comments.filter(function( comment ) {
      console.log(comment);
    return comment.username === username;
  });


  
    // Conditional rendering
    if (profile === undefined) {
      return <p>Nothing here</p>;
    } else return (
      <>
        <div>
            <h1>Profile: {username}</h1>
            <div>
                <p>All posts</p>
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
                <p>All comments</p>
                {
          findCommentsByProfile.length > 0 ? 
          findCommentsByProfile.map( (comment) => {
              return <div className='post-summary' key={comment._id}>
                  <Link to={`/post/${comment.id}`}>
                  <h2>Title: {comment.commentText}</h2>
                  <p>Date: {comment.commentDate}</p>
                  </Link>
          </div>}) : <div><h2>This profile didn't post anything</h2></div>
        }
            </div>
        </div>
      </>
    );
  }
  
  export default Profile;
  