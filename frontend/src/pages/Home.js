import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import axios from "axios";
import "./Home.css";

const Home = () => {
  const [sensorData, setSensorData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchSensorData = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://127.0.0.1:8000/api/readings");
      setSensorData(res.data);
    } catch (err) {
      console.error("Error fetching sensor data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSensorData();
  }, []);

  const phData = sensorData.map((d, index) => ({
    time: `#${index + 1}`,
    ph: d.pH,
  }));

  const tempData = sensorData.map((d, index) => ({
    time: `#${index + 1}`,
    temp: d.temperature,
  }));

  const doData = sensorData.map((d, index) => ({
    time: `#${index + 1}`,
    do: d.DO,
  }));

  const tdsData = sensorData.map((d, index) => ({
    time: `#${index + 1}`,
    tds: d.TDS,
  }));

  const latest = sensorData.length > 0 ? sensorData[sensorData.length - 1] : {};

  const metrics = [
    { label: "pH Level", value: latest.pH ?? "-", unit: "", color: "#38bdf8" },
    { label: "Temperature", value: latest.temperature ? `${latest.temperature}°C` : "-", unit: "", color: "#f87171" },
    { label: "Dissolved Oxygen", value: latest.DO ?? "-", unit: "mg/L", color: "#60a5fa" },
    { label: "Total Dissolved Solids", value: latest.TDS ?? "-", unit: "ppm", color: "#fbbf24" },
  ];

  return (
    <div>
      <h1 className="page-heading">
        Welcome to <span className="gold-text">Water Dashboard</span>
      </h1>

      <div className="card-grid">
        {metrics.map((item, idx) => (
          <div
            key={idx}
            className="info-card"
            style={{ borderLeft: `4px solid ${item.color}` }}
          >
            <h3>{item.label}</h3>
            <p>{item.value} {item.unit}</p>
          </div>
        ))}
      </div>

      <div className="chart-section">
        <div className="chart-box">
          <h2 className="chart-title">📊 pH Level Trend</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={phData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="time" stroke="#ccc" />
              <YAxis stroke="#ccc" domain={[6.5, 8.5]} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="ph"
                stroke="#38bdf8"
                strokeWidth={3}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-box">
          <h2 className="chart-title">🌡 Temperature Trend</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={tempData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="time" stroke="#ccc" />
              <YAxis stroke="#ccc" unit="°C" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="temp"
                stroke="#f87171"
                strokeWidth={3}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-box">
          <h2 className="chart-title">💧 Dissolved Oxygen Trend</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={doData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="time" stroke="#ccc" />
              <YAxis stroke="#ccc" unit="mg/L" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="do"
                stroke="#60a5fa"
                strokeWidth={3}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-box">
          <h2 className="chart-title">🧪 Total Dissolved Solids Trend</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={tdsData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="time" stroke="#ccc" />
              <YAxis stroke="#ccc" unit="ppm" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="tds"
                stroke="#fbbf24"
                strokeWidth={3}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Home;
