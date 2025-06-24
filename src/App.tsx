import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login  from './pages/Login';
import Home from './pages/Home';
import StartInspection from './pages/StartInspection';
import Inspection from './pages/Inspection';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/start" element={<StartInspection />} />
      <Route path="/inspection" element={<Inspection />} />
    </Routes>
  );
};

export default App;