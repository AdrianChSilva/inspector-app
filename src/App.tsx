import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login  from './pages/Login';
import Home from './pages/Home';
import StartInspection from './pages/StartInspection';
import Inspection from './pages/Inspection';
import Map from './pages/Map';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/start" element={<StartInspection />} />
      <Route path="/inspection" element={<Inspection />} />
      <Route path="/map" element={<Map />} />
    </Routes>
  );
};

export default App;