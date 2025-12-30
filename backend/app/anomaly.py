from sklearn.ensemble import IsolationForest
from sklearn.preprocessing import StandardScaler
import numpy as np
from typing import List, Dict, Tuple
class AnomalyDetector:
    def __init__(self):
        self.model = IsolationForest(n_estimators=100, contamination=0.1, random_state=42)
        self.scaler = StandardScaler()
        self.trained = False
    def fit(self, data: List[Dict]):
        X = np.array([[d["pH"], d["turbidity"], d["temperature"], d["DO"], d["TDS"]] for d in data])
        self.scaler.fit(X)
        X_scaled = self.scaler.transform(X)
        self.model.fit(X_scaled)
        self.trained = True
        print("[AnomalyDetector] ✅ Model trained on recent clean data.")
    def predict(self, sample: Dict) -> Tuple[bool, float]:
        if not self.trained:
            print("[AnomalyDetector] ⚠️ Not trained yet.")
            return False, 0.0
        x = np.array([[sample["pH"], sample["turbidity"], sample["temperature"], sample["DO"], sample["TDS"]]])
        x_scaled = self.scaler.transform(x)
        prediction = self.model.predict(x_scaled)[0]
        score = self.model.decision_function(x_scaled)[0]
        print(f"[AnomalyDetector] Input: {sample}")
        print(f"[AnomalyDetector] Scaled Input: {x_scaled.tolist()}")
        print(f"[AnomalyDetector] Anomaly Score: {score}")
        print(f"[AnomalyDetector] Prediction: {'Anomaly' if prediction == -1 else 'Normal'}")
        return bool(prediction == -1), float(score)
detector = AnomalyDetector()
async def detect_anomaly(new_sample: Dict) -> bool:
    if not detector.trained:
        from app import db
        recent_data = await db.database.readings.find().sort("timestamp", -1).to_list(length=100)
        normal_data = [d for d in recent_data if d.get("alert") == "None" or d.get("alert") is None]
        if len(normal_data) >= 10:
            print("[AnomalyDetector] Training model with clean data...")
            detector.fit(normal_data)
        else:
            print("[AnomalyDetector] Not enough clean data to train.")
            return False
    is_anomaly, _ = detector.predict(new_sample)
    return is_anomaly
