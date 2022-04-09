import React from 'react';
import Navbar from './components/Navbar';
import './App.css';
import Explore from './components/pages/Explore';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Submit from './components/pages/Submit';
import SignUp from './components/pages/SignUp';
import Project from './components/pages/Project';
import Cards from './components/Cards';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Explore/>} />
          <Route path='/submit' element={<Submit/>} />
          <Route path='/signup' element={<SignUp/>} />
        </Routes>
        <Routes>
          <Route path='/show_proj/:id' element={<Project/>} />
        
        </Routes>  
      </Router>
    </>
  );
}

export default App;
