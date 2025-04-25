import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "./Home.css";

const metrics = [
  { label: "pH Level", value: "7.2", unit: "", color: "#38bdf8" },
  { label: "Temperature", value: "22°C", unit: "", color: "#f87171" },
  { label: "Turbidity", value: "3 NTU", unit: "", color: "#a78bfa" },
  { label: "Sensors Online", value: "5/5", unit: "", color: "#34d399" },
];

// Dummy chart data (replace with backend fetch if needed)
const phData = [
  { time: "10:00", ph: 7.0 },
  { time: "10:10", ph: 7.1 },
  { time: "10:20", ph: 7.3 },
  { time: "10:30", ph: 7.2 },
  { time: "10:40", ph: 7.1 },
];

const tempData = [
  { time: "10:00", temp: 21 },
  { time: "10:10", temp: 22 },
  { time: "10:20", temp: 22.5 },
  { time: "10:30", temp: 22 },
  { time: "10:40", temp: 21.8 },
];

const Home = () => {
  return (
    <div>
      <h1 className="page-heading">
        Welcome to <span className="gold-text">Water Dashboard</span>
      </h1>

      {/* Summary cards */}
      <div className="card-grid">
        {metrics.map((item, idx) => (
          <div
            key={idx}
            className="info-card"
            style={{ borderLeft: 4px solid ${item.color} }}
          >
            <h3>{item.label}</h3>
            <p>{item.value}</p>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="chart-section">
        {/* pH Level Chart */}
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

        {/* Temperature Chart */}
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
      </div>
    </div>
  );
};

export default Home;
