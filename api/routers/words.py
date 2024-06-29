from fastapi import APIRouter, Request, Body, status
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse
from models import WordBase
from config import COLLECTION_NAME


router = APIRouter()


@router.get("/", response_description="List all words")
async def list_cars():
    # EUTODO: Implement list of words
    return {"data": "All words will go here."}


@router.post("/", response_description="Add new word")
async def create_word(request: Request, word: WordBase = Body(...)):
    # EUTODO: Handle duplicates in DB
    word = jsonable_encoder(word)
    new_word = await request.app.mongodb[COLLECTION_NAME].insert_one(word)
    created_word = await request.app.mongodb[COLLECTION_NAME].find_one({"_id": new_word.inserted_id})
    return JSONResponse(status_code=status.HTTP_201_CREATED, content=created_word)
