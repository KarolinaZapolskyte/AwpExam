import { useState, useEffect } from 'react';
import { Router } from "@reach/router";

import Posts from "./components/Posts";
import Post from "./components/Post";
import AddPost from "./components/AddPost";

const API_URL = process.env.REACT_APP_API;

function App() {
  const [posts, setPost] = useState([]);

  // const [setPost] = useState([]);

  useEffect(() => { 
    async function getData() {
      const url = `${API_URL}/posts`;
      const response = await fetch(url);
      const data = await response.json();
      setPost(data);
    }; 
    getData();
  }, []); 
  
  function getPost(id) {
    return posts.find(post => post._id === id);
  }

  function addPost(username, title, topicName) {

    const data = { 
      username: username,
      title: title, 
      topicName: topicName
    };
    
    async function postData() {
      const url = `${API_URL}/posts`;
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

  return (
    <>
    <div className="main container">
      <Router>
        <Posts path="/" data={posts.reverse()} />
        <Post path="/post/:id" getPost={getPost} />
        <AddPost path="/add-post" addPost={addPost} />
      </Router>
    </div>

    </>
  );
}

export default App;
