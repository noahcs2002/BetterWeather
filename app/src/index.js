import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App/App';
import reportWebVitals from './_Other/reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import About from './About/About';
// import Help from './Help/Help';
// import Feedback from './Feedback/Feedback';
// import Navbar from './Navbar/Navbar';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </React.StrictMode>
);