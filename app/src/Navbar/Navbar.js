import React from 'react';
import './Navbar.scss';
import logo from '../Resources/logo.png';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {

  const location = useLocation();
  return (
    <nav className="navbar">
      <div className="logo">
        <div className='logo-image'>
          <img 
              src={logo}
              width={75}
              height={75}
          /> 
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