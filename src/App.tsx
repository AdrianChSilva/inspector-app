import React from 'react';
import { Routes, Route } from 'react-router-dom';
// import Home from './pages/Home';
// import Login from './pages/Login';
// import StartInspection from './pages/StartInspection';
import Login  from './pages/Login';
import Home from './pages/Home';
import StartInspection from './pages/StartInspection';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/start" element={<StartInspection />} />
    </Routes>
  );
};

export default App;