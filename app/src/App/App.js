import './App.scss';
import React, {createContext, useEffect, useState} from 'react';
import Home from '../Home/Home';
import About from '../About/About';
import Help from '../Help/Help';
import Feedback from '../Feedback/Feedback';
import { Routes } from 'react-router-dom';
import { Route } from 'react-router-dom';

function App() {
  return (
    <div>
        <Routes>
          <Route path="/" element={ <Home/> }> </Route>
          <Route path="/about" element={ <About/> }> </Route>
          <Route path='/help' element={ <Help/> }> </Route>
          <Route path='/feedback' element={ <Feedback/> }> </Route>
        </Routes>
    </div>
  )
}

export default App;