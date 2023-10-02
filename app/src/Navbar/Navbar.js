import React from 'react';
import './Navbar.scss';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">Better Weather</div>
      <ul className="nav-links">
        <li>Home</li>
        <li>Forecast</li>
        <li>About</li>
      </ul>
    </nav>
  );
};

export default Navbar;