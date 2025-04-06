from fastapi import APIRouter
from app.anomaly import detector
from app import db

router = APIRouter()

@router.post("/train_anomaly_model")
async def train_anomaly_model():
    recent_data = await db.database.readings.find().sort("timestamp", -1).to_list(length=100)

    normal_data = [d for d in recent_data if d.get("alert") == "None" or d.get("alert") is None]

    if len(normal_data) >= 10:
        detector.fit(normal_data)
        return {"message": "Anomaly model trained successfully on clean data"}
    else:
        return {"message": "Not enough clean data to train the model"}
