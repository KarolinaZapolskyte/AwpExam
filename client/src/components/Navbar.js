import '../css/style.css';
import { Link } from '@reach/router';
import AuthService from './AuthService';

const API_URL = process.env.REACT_APP_API;
const authService = new AuthService(`${API_URL}/users/authenticate`);

function Navbar(props) {
  const { logout } = props;

  return (
    <>
      <header>
        <div className='flex-row'>
            <Link to={`/`}>Home</Link>
            <div className="flex-end">
              <Link to={`/add-post`}>
                <button className="btn">Submit a post</button>
              </Link>
              {!authService.loggedIn() ? 
                <div>
                  <Link to={`/login`}>
                    <button className="auth btn">Login</button>
                  </Link>
                </div> : <button className="auth btn" onClick={(event) => logout()}>Logout</button>
              }
            </div>
          </div>
      </header>
    </>
  );
}

export default Navbar;
