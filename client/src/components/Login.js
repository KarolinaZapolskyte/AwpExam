import { useState } from 'react';
import AuthService from './AuthService'

function Login(props) {
  const { login } = props;

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const API_URL = process.env.REACT_APP_API;
  const authService = new AuthService(`${API_URL}/users/authenticate`);

  function logIn () {
    login(username, password);
  }

  return (
    <>
      <h2>Login</h2>
      {!authService.loggedIn() ? 
      <div>
        <input onChange={(event) => setUsername(event.target.value)} 
          type='text' name='username' placeholder='username'></input>
        <input onChange={(event) => setPassword(event.target.value)} 
          type='password' name='password' placeholder='password'></input>
        <button type='button' onClick={() => logIn() }>Login</button>
        </div>
        : <p>You are loged in!</p>}
    </>
  );
}

export default Login;
