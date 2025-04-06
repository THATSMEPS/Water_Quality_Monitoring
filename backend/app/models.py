from pydantic import BaseModel

class SensorData(BaseModel):
    pH: float
    turbidity: float
    temperature: float
    DO: float
    TDS: float
