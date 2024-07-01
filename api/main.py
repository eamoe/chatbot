from fastapi.middleware.cors import CORSMiddleware
from config import DB_URL, DB_NAME
from fastapi import FastAPI
from motor.motor_asyncio import AsyncIOMotorClient
from routers.words import router as words_router
import uvicorn


origins = [
    "http://localhost",
    "http://localhost:8080",
    "http://localhost:3000",
    "http://localhost:8000",
    "http://10.211.55.2",
    "http://10.211.55.2:8000",
]

app = FastAPI()

app.add_middleware(CORSMiddleware,
                   allow_origins=origins,
                   allow_credentials=True,
                   allow_methods=["*"],
                   allow_headers=["*"],)

app.include_router(words_router, prefix="/words", tags=["words"])


# Attach the MongoDB connection to the event startup of FastAPI
@app.on_event("startup")
async def startup_db_client():
    app.mongodb_client = AsyncIOMotorClient(DB_URL)
    app.mongodb = app.mongodb_client[DB_NAME]


# Close the MongoDB connection by attaching it to the event shutdown  of FastAPI
@app.on_event("shutdown")
async def shutdown_db_client():
    app.mongodb_client.close()


if __name__ == "__main__":
    uvicorn.run(app="main:app", reload=True)
