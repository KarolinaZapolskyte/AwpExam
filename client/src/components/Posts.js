import { Link } from '@reach/router';
import { useState } from 'react';

function Posts(props) {
  const { data } = props;

  const  [topic, setTopicName] = useState('All topics');

  // filter posts based on the selected topic
  const filter = data.reverse().filter(function( top ) {
    if (topic !== 'All topics') {
      return top.topicName === topic;
    } else {
      return data.reverse()
    }
  });

  return (
    <>
      <h1>Recent posts</h1>
      <select defaultValue='All topics' onChange={(event) => setTopicName(event.target.value)}>
        <option value='All topics'>All topics</option>
        <option value='Food'>Food</option>
        <option value='Politics'>Politics</option>
        <option value='News'>News</option>
        <option value='Gardening'>Gardening</option>
      </select>
      <div>
        <h4>Topic name: {topic}</h4>
        {
          filter.length > 0 ? 
          filter.map( (post, index) => { 
            return index < 15 ? <div className='post-summary' key={post._id}>
            <Link to={`/users/${post.username}`}>Author: {post.username}<br /></Link><Link to={`/post/${post._id}`}>Date: {post.submitDate}<br />Post title: {post.title}<br />Topic: {post.topicName}</Link>
          </div> : undefined } ) : <div><h2>Sorry, we don't have posts in this category</h2></div>
        }
      </div>

    </>
  );
}

export default Posts;
