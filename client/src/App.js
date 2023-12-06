
import React from 'react';
import './App.css';
import Navbar from './components/navbar';
import { BrowserRouter as Router, Route, Routes, Outlet } from 'react-router-dom';
import Header from './components/header';
import Registration from './components/Registration';
import Login from './components/login';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>

          <Route path="/" element={<Outlet />}>
            <Route index element={<Header />} />
            <Route path="registration" element={<Registration />} />
            <Route path="login" element={<Login />} />

          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
