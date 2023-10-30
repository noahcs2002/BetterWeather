import React from 'react';
import './Footer.scss';

/**
 * Footer
 * @returns React Module to display the footer
 * @author Noah Sternberg
 * @since V1.2.0
 */
const Footer = ({versionNumber}) => {

  return (
    <div className="footer">
        <p>{versionNumber}</p>
    </div>
  );
};

export default Footer;