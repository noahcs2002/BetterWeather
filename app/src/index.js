import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App/App';
import reportWebVitals from './_Other/reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import About from './About/About';
import Help from './Help/Help';
import Feedback from './Feedback/Feedback';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <App/> }> </Route>
        <Route path="/about" element={<About/>}> </Route>
        <Route path='/help' element={<Help/>}> </Route>
        <Route path='/feedback' element={<Feedback/>}> </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);