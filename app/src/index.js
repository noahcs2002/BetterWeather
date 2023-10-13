import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App/App';
import reportWebVitals from './_Other/reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import About from './About/About';
import BugReport from './Reporting/BugReport';
import CityReport from './Reporting/CityReport';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <App /> }> </Route>
        <Route path="/about" element={<About/>}> </Route>
        <Route path='/bug-report' element={<BugReport/>}> </Route>
        <Route path='/city-report' element={<CityReport/>}> </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
