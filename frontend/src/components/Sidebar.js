import React from 'react';
import { Link } from 'react-router-dom';


function Sidebar() {
  return (
    <div className="sidebar">
      <h2>Water Dashboard</h2>
      <ul>
        <li><Link to="/">🏠 Home</Link></li>
        <li><Link to="/analytics">📊 Analytics</Link></li>
        <li><Link to="/sensordata">📡 Sensor Data</Link></li>
        <li><Link to="/alerts">🚨 Alerts</Link></li>
        <li><Link to="/datamanagement">🛠️ Data Management</Link></li>
        
      </ul>
    </div>
  );
}

export default Sidebar;
