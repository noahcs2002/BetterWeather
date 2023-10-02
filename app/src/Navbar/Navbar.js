import React from 'react';
import './Navbar.scss';
import logo from '../Resources/logo.png';

const Navbar = () => {
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
        <li>Home</li>
        <li>Forecast</li>
        <li>About</li>
      </ul>
    </nav>
  );
};

export default Navbar;