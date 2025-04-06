from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from app.routes import sensor_routes, training_routes

@asynccontextmanager
async def lifespan(app: FastAPI):
    from app.routes.training_routes import train_anomaly_model
    await train_anomaly_model()
    yield  # App runs after this

app = FastAPI(lifespan=lifespan)

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
app.include_router(training_routes.router, prefix="/api")
