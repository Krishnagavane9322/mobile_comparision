import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import MobileList from './components/MobileList';
import MobileDetail from './components/MobileDetail';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
 

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            
            <Route path="/mobiles" element={<MobileList />} />
            <Route path="/mobile/:id" element={<MobileDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
