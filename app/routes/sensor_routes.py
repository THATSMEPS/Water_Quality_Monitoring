from fastapi import APIRouter
from app.models import SensorData
from app import db
from app.alerts import evaluate_alerts
import datetime
from app.anomaly import detect_anomaly

router = APIRouter()

@router.post("/api/sensor-data")
async def receive_data(data: SensorData):
    document = data.model_dump()
    document["timestamp"] = datetime.datetime.now(datetime.timezone.utc)

    # Detect anomalies
    is_anomalous = detect_anomaly(document)
    document["anomaly"] = is_anomalous

    alerts = evaluate_alerts(document)
    if alerts:
        document["alerts"] = alerts

    await db.database.readings.insert_one(document)
    return {
        "message": "Data received",
        "alerts_triggered": alerts,
        "anomaly_detected": is_anomalous
    }

@router.get("/api/readings")
async def get_all_readings():
    cursor = db.database.readings.find().sort("timestamp", -1).limit(100)
    readings = []
    async for document in cursor:
        document["_id"] = str(document["_id"])
        readings.append(document)
    return readings

@router.get("/api/readings/latest")
async def get_latest_reading():
    doc = await db.database.readings.find_one(sort=[("timestamp", -1)])
    if doc:
        doc["_id"] = str(doc["_id"])
        return doc
    return {"message": "No data found"}
