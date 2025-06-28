import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './utils/ProtectedRoute';
import TrackingMap from './pages/TrackingMap';

const Login = lazy(() => import('./pages/Login'));
const Home = lazy(() => import('./pages/Home'));
const StartInspection = lazy(() => import('./pages/StartInspection'));
const Inspection = lazy(() => import('./pages/Inspection'));
const Map = lazy(() => import('./pages/Map'));

const App = () => {
  return (
    <Suspense fallback={<div className="text-center p-4">Cargando...</div>}>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/home" element={<Home />} />
          <Route path="/start" element={<StartInspection />} />
          <Route path="/inspection" element={<Inspection />} />
          <Route path="/map" element={<Map />} />
          <Route path="/trackingMap" element={<TrackingMap />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default App;