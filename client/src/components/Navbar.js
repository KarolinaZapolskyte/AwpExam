import "../css/style.css";
import { Link, Router } from "@reach/router";

function Navbar() {

  return (
    <>
      <header>
        <div className="flex-row space-between">
            <Link to={`/`}>Home</Link>
            <p>All topics</p>
            <p>Food</p>
            <p>Politics</p>
            <p>News</p>
            <p>Gardening</p>
            <div className="nav-buttons">
              <Link to={`/add-post`}>Submit a post</Link>
              <button className="">Login</button>
            </div>
          </div>
      </header>
    </>
  );
}

export default Navbar;
