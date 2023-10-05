import React from 'react';
import './Navbar.scss';
import logo from '../Resources/logo.png';
import { Link, useLocation } from 'react-router-dom';

/**
 * Navbar
 * @returns React Module to display the navbar
 * @author Noah Sternberg
 * @since V1.0.0
 */
const Navbar = () => {

  // Get website location to tell where we are, then
  // show home if we aren't home, about if we aren't on about.
  const location = useLocation();
  return (
    <nav className="navbar">
      <div className="logo">
        <div className='logo-image'>
          <Link to="/">
            <img 
                src={logo}
                width={75}
                height={75}
            />
          </Link> 
        </div>
        <div className='logo-title'>
          <p>BetterWeather</p>
        </div>
        
      </div>
      <ul className="nav-links">
        {location.pathname !== '/' && <li><Link to="/" className='link'> Home </Link></li>}
        {location.pathname !== '/about' && <li><Link to="/about" className='link'> About </Link></li>}
      </ul>
    </nav>
  );
};

export default Navbar;