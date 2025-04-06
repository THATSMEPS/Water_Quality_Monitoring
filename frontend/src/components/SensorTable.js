import React, { useEffect, useState } from 'react';
import axios from 'axios';

function SensorTable() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await axios.get('http://127.0.0.1:8000/api/readings');
      setData(res.data);
    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="table-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3>Sensor Readings</h3>
        <button onClick={fetchData} className="refresh-button">🔁 Refresh</button>
      </div>
  
      {loading ? (
        <p>Loading data...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>No.</th>
              <th>PH</th>
              <th>Temperature (°C)</th>
              <th>Turbidity (NTU)</th>
              <th>DO (mg/L)</th>
              <th>TDS (ppm)</th>
              <th>Anomaly</th>
              <th>Alerts</th>
            </tr>
          </thead>
          <tbody>
            {data.map((d, index) => (
              <tr key={index} className={d.anomaly ? "anomaly-row" : ""}>
                <td>{index + 1}</td>
                <td>{d.pH}</td>
                <td>{d.temperature}</td>
                <td>{d.turbidity}</td>
                <td>{d.DO}</td>
                <td>{d.TDS}</td>
                <td>{d.anomaly ? "Yes" : "No"}</td>
                <td>{d.alerts ? d.alerts.join(', ') : "None"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
  
}

export default SensorTable;
