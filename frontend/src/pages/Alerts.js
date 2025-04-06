import React, { useEffect, useState } from 'react';

function Alerts() {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/readings')
      .then((res) => res.json())
      .then((data) => {
        const filtered = data.filter(entry => entry.alerts && entry.alerts !== 'None');
        setAlerts(filtered);
      });
  }, []);

  return (
    <div className="sensor-data-container">
      <h2 style={{ color: 'yellow' }}>🚨 Alert History</h2>
      {alerts.length === 0 ? (
        <p>No alerts triggered yet.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Timestamp</th>
              <th>pH</th>
              <th>Temperature (°C)</th>
              <th>Turbidity (NTU)</th>
              <th>DO (mg/L)</th>
              <th>TDS (ppm)</th>
              <th>Alert(s)</th>
            </tr>
          </thead>
          <tbody>
            {alerts.map((entry, idx) => (
              <tr key={idx}>
                <td>{new Date(entry.timestamp).toLocaleString()}</td>
                <td>{entry.ph}</td>
                <td>{entry.temperature}</td>
                <td>{entry.turbidity}</td>
                <td>{entry.do}</td>
                <td>{entry.tds}</td>
                <td style={{ color: 'red' }}>{entry.alerts}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Alerts;
