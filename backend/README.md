# 💧 Water Quality Monitoring Backend (FastAPI + MongoDB)

This backend application powers a real-time water quality monitoring system. It collects sensor data, detects anomalies using AI, triggers alerts, and supports dashboard integration.

---

## 📦 Features

- ✅ RESTful API for sending and retrieving sensor data
- 📊 Fetch latest or recent 100 sensor readings
- 🔔 Smart alerting based on environmental thresholds
- 🤖 AI-based anomaly detection using Isolation Forest
- 📉 Real-time dashboard integration support
- 🧹 Utility endpoints to delete old readings

---

## 🛠️ Tech Stack

- **Backend:** FastAPI
- **Database:** MongoDB (Local or Atlas)
- **ML Model:** Scikit-learn (Isolation Forest)
- **Visualization (Frontend):** To be built with React + Recharts

---
## 🚀 Getting Started

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/THATSMEPS/Water_quality_monitoring_backend.git
cd Water_quality_monitoring_backend
```
### 2️⃣ Set Up Virtual Environment
```bash
python -m venv venv
venv\Scripts\activate  # Windows
# OR
source venv/bin/activate  # Linux/Mac
```
### 3️⃣ Install Dependencies
```bash
pip install -r requirements.txt
```
### 4️⃣ Configure MongoDB
-**Local MongoDB:** No setup needed (default is mongodb://localhost:27017)
-**MongoDB Atlas:** Replace the URI in app/db.py:

```python
client = motor.motor_asyncio.AsyncIOMotorClient("your-atlas-uri")
```
### ▶️ Running the Server
```bash
uvicorn main:app --reload
Visit: http://127.0.0.1:8000/docs to test the API via Swagger UI.
```
---
### 📡 API Endpoints
### 🔽 Sensor Data
- POST /api/sensor-data → Send sensor data
- GET /api/readings → Get latest 100 readings
- GET /api/readings/latest → Get the latest single reading

### 🚨 Alerts & Anomalies
- Auto-generated during POST based on:
  - pH level
  - Turbidity
  - Dissolved Oxygen (DO)
  - TDS
- Anomaly detection using Isolation Forest (if enough data exists)

### 🧹 Deletion Utilities
- DELETE /api/readings/delete_all → Delete all sensor data
- DELETE /api/readings/delete_latest/10 → Delete last 10 readings
- DELETE /api/readings/delete_latest/100 → Delete last 100 readings

### ✅ Example Sensor Data Payload
```json
{
  "pH": 7.2,
  "turbidity": 3.5,
  "temperature": 25.3,
  "DO": 6.7,
  "TDS": 400
}
```

### 👨‍💻 Contributing
Pull requests are welcome! For major changes, open an issue first to discuss what you’d like to change.

### 📬 Contact
If you have any questions or suggestions:
- **Team Lead: Pratham Shah**
- **GitHub: @THATSMEPS**

