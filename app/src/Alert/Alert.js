import React from 'react';
import ReactDOM from 'react-dom';
import './Alert.scss';

const Alert = ({ searchedText, onRetry }) => {

  const handleClick = () => {
    onRetry(false);
  }

  return ReactDOM.createPortal(
    <div className="modal">
      <div className="modal-content">
        <p>There were no results for: {searchedText}</p>
        <p onClick={handleClick} className='b'>Dismiss</p>
      </div>
    </div>,
    document.body
  );
};

export default Alert;   