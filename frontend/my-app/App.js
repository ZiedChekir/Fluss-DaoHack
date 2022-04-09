import React from 'react';
import Navbar from './components/Navbar';
import './App.css';
import Explore from './components/pages/Explore';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Submit from './components/pages/Submit';
import SignUp from './components/pages/SignUp';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Explore/>} />
          <Route path='/services' element={<Submit/>} />
          <Route path='/sign-up' element={<SignUp/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
