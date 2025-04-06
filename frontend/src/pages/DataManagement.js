import React, { useState } from 'react';

import axios from 'axios';

function DataManagement() {
  const [newData, setNewData] = useState({
    pH: '',
    temperature: '',
    turbidity: '',
    DO: '',
    TDS: ''
  });
  const [customCount, setCustomCount] = useState('');
  const handleDelete = async (type) => {
    try {
      if (type === "all") {
        await axios.delete('http://127.0.0.1:8000/api/readings/delete_all');
        alert("All sensor data deleted.");
      } else {
        await axios.delete(`http://127.0.0.1:8000/api/readings/delete_latest/${type}`);
        alert(` Last ${type} entries deleted.`);
      }
    } catch (error) {
      console.error("Error deleting data:", error);
      alert("Failed to delete data.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://127.0.0.1:8000/api/sensor-data", {
        pH: parseFloat(newData.pH),
        temperature: parseFloat(newData.temperature),
        turbidity: parseFloat(newData.turbidity),
        DO: parseFloat(newData.DO),
        TDS: parseFloat(newData.TDS),
      });
      alert("Dummy reading submitted!");
      setNewData({ pH: '', temperature: '', turbidity: '', DO: '', TDS: '' });
    } catch (err) {
      console.error("Error posting data:", err);
      alert("Failed to submit dummy data.");
    }
  };

  return (
    <div className="DataManagement-container">
      <h1 className="page-heading">⚙️ Data Management</h1>
      <p>Use the options below to clear sensor data from the database.</p>

      <div className="button-group">
        <button className="delete-button" onClick={() => handleDelete("all")}>
          🗑️ Delete All Data
        </button>

        <button className="delete-button" onClick={() => handleDelete(10)}>
           Delete Last 10 Entries
        </button>

        <button className="delete-button" onClick={() => handleDelete(100)}>
           Delete Last 100 Entries
        </button>
      </div>
      <div className="custom-delete-section">
        <input
          type="number"
          placeholder="Enter custom count"
          value={customCount}
          onChange={(e) => setCustomCount(e.target.value)}
          className="custom-delete-input"
        />
        <button
          className="delete-button"
          onClick={() => handleDelete(customCount)}
          disabled={!customCount || customCount <= 0}
        >
          Delete Last {customCount} Entries
        </button>
      </div>
      <hr style={{ margin: "30px 0", borderColor: "#333" }} />

      <h2 className="gold-text">Post Dummy Sensor Reading</h2>
      <form onSubmit={handleSubmit} className="dummy-form">
        <input type="number" step="0.1" placeholder="pH" value={newData.pH}
          onChange={(e) => setNewData({ ...newData, pH: e.target.value })} required />
        <input type="number" step="0.1" placeholder="Temperature" value={newData.temperature}
          onChange={(e) => setNewData({ ...newData, temperature: e.target.value })} required />
        <input type="number" step="0.1" placeholder="Turbidity" value={newData.turbidity}
          onChange={(e) => setNewData({ ...newData, turbidity: e.target.value })} required />
        <input type="number" step="0.1" placeholder="DO" value={newData.DO}
          onChange={(e) => setNewData({ ...newData, DO: e.target.value })} required />
        <input type="number" step="0.1" placeholder="TDS" value={newData.TDS}
          onChange={(e) => setNewData({ ...newData, TDS: e.target.value })} required />
        <button type="submit" className="delete-button">Submit Dummy Reading</button>
      </form>
    </div>
  );
}

export default DataManagement;
