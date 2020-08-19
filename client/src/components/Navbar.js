import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const { pathname } = useLocation();
  const [isMoviePath, setIsMoviePath] = useState(false);

  useEffect(() => {
    if(pathname.slice(0, 6) === '/movie') setIsMoviePath(true);
    else setIsMoviePath(false);
  }, [pathname])

  return (
    <div>
      <nav className="navbar navbar-expand-lg">
        <Link className="navbar-brand" to='/'>Home</Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link className="nav-link" to='/movie'>Movies</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to='/series'>Series</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to='/favorites'>Favorites</Link>
            </li>
            {isMoviePath &&
              (<li className="nav-item">
                <Link className="nav-link" to='/movie/create'>Create</Link>
              </li>)
            }
            <li className="nav-item">
              <span className="nav-link">Edit</span>
            </li>
            <li className="nav-item">
              <span className="nav-link">Detail</span>
            </li>
          </ul>
          <form className="form-inline my-2 my-lg-0 pt-2 pb-2">
            <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
            <button className="btn btn-outline-info my-2 my-sm-0" type="submit">Search</button>
          </form>
        </div>
      </nav>
    </div>
  )
}

export default Navbar;