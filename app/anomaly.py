from sklearn.ensemble import IsolationForest
import numpy as np

class AnomalyDetector:
    def __init__(self):
        self.model = IsolationForest(n_estimators=100, contamination=0.1)
        self.trained = False

    def fit(self, data: list[dict]):
        X = [[d["pH"], d["turbidity"], d["temperature"], d["DO"], d["TDS"]] for d in data]
        self.model.fit(X)
        self.trained = True

    def predict(self, sample: dict) -> bool:
        if not self.trained:
            return False  # can't predict without training

        x = [[sample["pH"], sample["turbidity"], sample["temperature"], sample["DO"], sample["TDS"]]]
        result = self.model.predict(x)
        return result[0] == -1  # -1 means anomaly
