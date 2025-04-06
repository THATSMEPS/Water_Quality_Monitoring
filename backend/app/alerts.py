def evaluate_alerts(data: dict) -> list:
    alerts = []

    if data["pH"] < 6.5 or data["pH"] > 8.5:
        alerts.append("Abnormal pH level detected.")
    if data["turbidity"] > 5:
        alerts.append("High turbidity detected.")
    if data["DO"] < 5:
        alerts.append("Low dissolved oxygen detected.")
    if data["DO"] > 12:
        alerts.append("High dissolved oxygen detected.")
    if data["TDS"] > 500:
        alerts.append("High TDS level detected.")
    if data["TDS"] < 50:
        alerts.append("Very Low TDS level detected.")

    return alerts
