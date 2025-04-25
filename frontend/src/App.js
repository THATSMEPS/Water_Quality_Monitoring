import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './style.css'; 
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import SensorData from './pages/SensorData';
import DataManagement from './pages/DataManagement';
import Alerts from './pages/Alerts';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Sidebar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            
            <Route path="/sensordata" element={<SensorData />} />
            <Route path="/datamanagement" element={<DataManagement />} />
            <Route path="/alerts" element={<Alerts />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
