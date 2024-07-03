from fastapi.middleware.cors import CORSMiddleware
from config import DB_URL, DB_NAME, COLLECTION_NAME
from fastapi import FastAPI
from motor.motor_asyncio import AsyncIOMotorClient
from routers.words import router as words_router
import uvicorn
from contextlib import asynccontextmanager


origins = [
    "*",
    # "http://localhost",
    # "http://localhost:8080",
    # "http://localhost:3000",
    # "http://localhost:8000",
]


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Attach the MongoDB connection to the startup of FastAPI
    app.mongodb_client = AsyncIOMotorClient(DB_URL)
    app.mongodb = app.mongodb_client[DB_NAME]
    await app.mongodb[COLLECTION_NAME].create_index([("wordName", 1)])
    yield
    # Close the MongoDB connection by attaching it to the shutdown of FastAPI
    app.mongodb_client.close()

app = FastAPI(lifespan=lifespan)

app.add_middleware(CORSMiddleware,
                   allow_origins=origins,
                   allow_credentials=True,
                   allow_methods=["*"],
                   allow_headers=["*"],)

app.include_router(words_router, prefix="/words", tags=["words"])


if __name__ == "__main__":
    uvicorn.run(app="main:app", reload=True)
