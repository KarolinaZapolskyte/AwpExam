import { useState } from 'react';

function AddPost(props) {
  const { addPost } = props;

  const [username, setUsername] = useState("");
  const [title, setTitle] = useState("");
  const [topicName, setTopicName] = useState("");

  // Conditional rendering
  return (
    <>
        <h1 className="bold">Post submission</h1>
        <div className="row">
          <div className="column">
            <div className="question-boxes">
              <label>Post author</label>
              <input onChange={(event) => setUsername(event.target.value)} type="text" />
              <br />
              <label>Post title</label>
              <input onChange={(event) => setTitle(event.target.value)} type="text" />
              <br />
              <label>Topic</label>
              <select onChange={(event) => setTopicName(event.target.value)}>
                <option value="">Select your option</option>
                <option value="Food">Food</option>
                <option value="Politics">Politics</option>
                <option value="News">News</option>
                <option value="Gardening">Gardening</option>
              </select>
            </div>
            <br />
            <button type="button" disabled={topicName === '' || username === '' || title === ''}  onClick={(event) => { addPost(username, title, topicName) }}>Submit your post</button>
          </div>
        </div>
    </>
  );
}

export default AddPost;
