from fastapi import APIRouter
from app.models import SensorData
from app import db
from app.alerts import evaluate_alerts
import datetime
from app.anomaly import detect_anomaly
from fastapi import HTTPException

router = APIRouter()

@router.post("/api/sensor-data")    
async def receive_data(data: SensorData):
    document = data.model_dump()
    document["timestamp"] = datetime.datetime.now(datetime.timezone.utc)

    # Detect anomalies
    is_anomalous = await detect_anomaly(document)
    document["anomaly"] = bool(is_anomalous)

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

@router.delete("/api/readings/delete_all")
async def delete_all_readings():
    result = await db.database.readings.delete_many({})
    return {"message": f"Deleted {result.deleted_count} readings."}

# Delete latest N entries
@router.delete("/api/readings/delete_latest/{count}")
async def delete_latest_readings(count: int):
    if count <= 0:
        raise HTTPException(status_code=400, detail="Count must be a positive integer.")
    
    # Get the latest N document _ids
    cursor = db.database.readings.find().sort("timestamp", -1).limit(count)
    ids_to_delete = []
    async for doc in cursor:
        ids_to_delete.append(doc["_id"])

    if ids_to_delete:
        result = await db.database.readings.delete_many({"_id": {"$in": ids_to_delete}})
        return {"message": f"Deleted {result.deleted_count} latest readings."}
    else:
        return {"message": "No readings found to delete."}