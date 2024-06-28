from config import DB_URL, DB_NAME
from fastapi import FastAPI
from motor.motor_asyncio import AsyncIOMotorClient


app = FastAPI()


# Attach the MongoDB connection to the event startup of FastAPI
@app.on_event("startup")
async def startup_db_client():
    app.mongodb_client = AsyncIOMotorClient(DB_URL)
    app.mongodb = app.mongodb_client[DB_NAME]


# Close the MongoDB connection by attaching it to the event shutdown  of FastAPI
@app.on_event("shutdown")
async def shutdown_db_client():
    app.mongodb_client.close()
