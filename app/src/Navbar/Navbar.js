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

  return (
    
    <nav className="navbar">
      
    <div className="logo">
        <div className='logo-image'>
          <Link to="/">
            <img 
                src={logo}
                width={75}
                height={75}
                alt='Logo'
            />
          </Link> 
        </div>
        <div className='logo-title'>
          <p>BetterWeather</p>
        </div>
      </div>
      
      <ul className="nav-links">
        {<li><Link to="/" className='link'> Home </Link></li>}
        {<li> <Link to='/help' className='link'> Help </Link></li>}
        {<li><Link to="/about" className='link'> About </Link></li>}
        {<li> <Link to='/feedback' className='link'> Feedback </Link></li>}
      </ul>
    </nav>
  );
};



export default Navbar;