from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import sensor_routes

app = FastAPI()

# CORS setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# Include routes
app.include_router(sensor_routes.router)
