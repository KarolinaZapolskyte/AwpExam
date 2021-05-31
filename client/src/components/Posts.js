import { Link } from "@reach/router";

function Posts(props) {
  const { data } = props;

  return (
    <>
      <h1>Recent posts</h1>
      <div>
        {
          data.map( (post, index) => { 
            return index < 15 ? <div className="post-summary" key={post._id}>
            <Link to={`/post/${post._id}`}>Author: {post.username}<br />Date: {post.submitDate}<br />Post title: {post.title}<br />Topic: {post.topicName}</Link>
          </div> : undefined } )
        }
      </div>

    </>
  );
}

export default Posts;
