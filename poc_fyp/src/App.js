import React from 'react';
import './App.css';
import Home from './Home';
import Predict from './Predict';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path = '/' element = {<Home/>}/>
        <Route path = '/predict' element = {<Predict/>}/>
      </Routes>
    </Router>
  );
}

export default App;
