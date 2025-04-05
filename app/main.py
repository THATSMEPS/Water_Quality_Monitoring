from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from app import db
import datetime

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
class SensorData(BaseModel):
    pH: float
    turbidity: float
    temperature: float
    DO: float
    TDS: float

@app.post("/api/sensor-data")
async def receive_data(data: SensorData):
    document = data.dict()
    document["timestamp"] = datetime.datetime.now(datetime.timezone.utc)
    await db.database.readings.insert_one(document)
    return {"message": "Data received"}