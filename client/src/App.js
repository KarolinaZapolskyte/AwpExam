import { useState, useEffect } from 'react';
import { Router, navigate } from '@reach/router';

import Posts from './components/Posts';
import Post from './components/Post';
import Profile from './components/Profile';
import AddPost from './components/AddPost';
import Login from './components/Login';
import AuthService from './components/AuthService';

const API_URL = process.env.REACT_APP_API;
const authService = new AuthService(`${API_URL}/users/authenticate`);

function App() {
  const [posts, setPost] = useState([]);
  const [comments, setComment] = useState([]);
  const [users, setProfile] = useState([]);
  const [addPostData, setAddPost] = useState(0);

  useEffect(() => { 
    async function getData() {
      const url = `${API_URL}/posts`;
      const response = await fetch(url);
      const data = await response.json();
      setPost(data);

      const urlComment = `${API_URL}/comments`;
      const responseComment = await fetch(urlComment);
      const dataComment = await responseComment.json();
      setComment(dataComment);

      const urlProfile = `${API_URL}/users`;
      const responseProfile = await fetch(urlProfile);
      const dataProfile = await responseProfile.json();
      setProfile(dataProfile);
    }; 
    getData();
  }, [addPostData]);  
  
  function getPost(id) {
    return posts.find(post => post._id === id);
  }

  function getProfile(username) {
    return users.find(user => user.username === username);
  }

  function addPost(username, title, topicName) {

    const data = { 
      username: username,
      title: title, 
      topicName: topicName
    };
    
    async function postData() {
      navigate('/') // Redirect to the homepage with recent 15 posts
      setTimeout(() => {
        setAddPost(p => p + 1); // Refresh data after post is posted
      }, 100);
      
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
    authService.getToken()
  }

  // Login using API
  async function login(username, password) {
    try {
      const resp = await authService.login(username, password);
      console.log('Authentication:', resp.msg);
      setAddPost(p => p + 1); // Refresh data after post is posted
    } catch (e) {
      console.log('Login', e);
    }
  }

  return (
    <>
    <div className='main container'>
      <Router>
        <Posts path='/' data={posts} />
        <Post path='/post/:id' getPost={getPost} />
        <Profile path='/users/:username' getProfile={getProfile} data={posts} comments={comments} />
        <AddPost path='/add-post' addPost={addPost} />
        <Login path='/login' login={login} />
      </Router>
    </div>

    </>
  );
}

export default App;
