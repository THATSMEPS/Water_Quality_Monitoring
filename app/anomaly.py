from sklearn.ensemble import IsolationForest
import numpy as np
from typing import List, Dict

# Singleton pattern to avoid re-training every time
class AnomalyDetector:
    def __init__(self):
        self.model = IsolationForest(n_estimators=100, contamination=0.1)
        self.trained = False

    def fit(self, data: List[Dict]):
        X = [[d["pH"], d["turbidity"], d["temperature"], d["DO"], d["TDS"]] for d in data]
        self.model.fit(X)
        self.trained = True

    def predict(self, sample: Dict) -> bool:
        if not self.trained:
            return False
        x = [[sample["pH"], sample["turbidity"], sample["temperature"], sample["DO"], sample["TDS"]]]
        result = self.model.predict(x)
        return bool(result[0] == -1)

# Create a global detector instance
detector = AnomalyDetector()

async def detect_anomaly(new_sample: Dict) -> bool:
    # Train model only if not already trained
    if not detector.trained:
        from app import db  # Local import to avoid circular dependency
        recent_data = await db.database.readings.find().sort("timestamp", -1).to_list(length=100)
        if len(recent_data) >= 10:
            print("Training Isolation Forest model with recent data...")  # Ensure enough data
            detector.fit(recent_data)
        else:
            return False  # Not enough data to train

    return detector.predict(new_sample)
