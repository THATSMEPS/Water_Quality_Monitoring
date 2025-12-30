#creating dummy data for testing purposes
import requests
import random

url = "http://127.0.0.1:8000/api/sensor-data"

def generate_entry():
    return {
        "pH": round(random.uniform(6.8, 7.8), 2),
        "temperature": round(random.uniform(20, 24), 1),
        "turbidity": round(random.uniform(0.5, 1.2), 2),
        "DO": round(random.uniform(6.7, 7.5), 2),
        "TDS": round(random.uniform(270, 400), 0)
    }

for i in range(100):
    data = generate_entry()
    response = requests.post(url, json=data)
    print(f"Entry {i+1}: Status {response.status_code} - {response.json()}")