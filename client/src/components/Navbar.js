import '../css/style.css';
import { Link } from '@reach/router';
import AuthService from './AuthService';

const API_URL = process.env.REACT_APP_API;
const authService = new AuthService(`${API_URL}/users/authenticate`);

function Navbar() {

  return (
    <>
      <header>
        <div className='flex-row space-between'>
            <Link to={`/`}>Home</Link>
            <p>View posts</p>
              <Link to={`/add-post`}>Submit a post</Link>
              {!authService.loggedIn() ? 
              <div>
                <Link to={`/login`}>Login</Link>
              </div> : <button onClick={authService.logout()}>Logout</button>}
          </div>
      </header>
    </>
  );
}

export default Navbar;
