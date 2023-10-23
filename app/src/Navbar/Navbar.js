import React from 'react';
import './Navbar.scss';
import logo from '../Resources/logo.png';
import { Link, useLocation } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import About from '../About/About';
import Help from '../Help/Help';
import App from '../App/App';
import Feedback from '../Feedback/Feedback';

/**
 * Navbar
 * @returns React Module to display the navbar
 * @author Noah Sternberg
 * @since V1.0.0
 */
const Navbar = () => {

  const handleHelpClick = () => {
    
  }

  const handleAboutClick = () => {

  }

  const handleFeedbackClick = () => {

  }

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
                alt='Logo'
            />
          </Link> 
        </div>
        <div className='logo-title'>
          <p>BetterWeather</p>
        </div>
      </div>
      
      <ul className="nav-links">
        {location.pathname !== '/' ? (<li><Link to="/" className='link'> Home </Link></li>) : (<></>)}
        {location.pathname !== '/help' ?  (<li> <Link to='/help' className='link'> Help </Link></li>) : (<></>)}
        {location.pathname !== '/about' ? (<li><Link to="/about" className='link'> About </Link></li>) : (<></>)}
        {location.pathname !== '/feedback' ? (<li> <Link to='/feedback' className='link'> Feedback </Link></li>) : (<></>)}
      </ul>
    </nav>
  );
};



export default Navbar;