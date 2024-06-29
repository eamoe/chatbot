from fastapi import APIRouter, Request, Body, status, HTTPException
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse
from models import WordBase, WordDB
from config import COLLECTION_NAME
from typing import Optional, List


router = APIRouter()


@router.get("/", response_description="List all words")
async def list_all_words(request: Request,
                         word_name: str = "",
                         part_of_speech: str = "",
                         definition: Optional[str] = None,
                         page: int = 1,) -> List[WordDB]:
    RESULTS_PER_PAGE = 25
    skip = (page - 1) * RESULTS_PER_PAGE
    query = {}
    if word_name:
        query["wordName"] = word_name
    if part_of_speech:
        query["partOfSpeech"] = part_of_speech
    if definition:
        query["definition"] = definition
    full_query = request.app.mongodb[COLLECTION_NAME].find(query).sort("_id", -1).skip(skip).limit(RESULTS_PER_PAGE)
    results = [WordDB(**raw_word) async for raw_word in full_query]
    return results


@router.post("/", response_description="Add new word")
async def create_word(request: Request, word: WordBase = Body(...)):
    # EUTODO: Handle duplicates in DB
    word = jsonable_encoder(word)
    new_word = await request.app.mongodb[COLLECTION_NAME].insert_one(word)
    created_word = await request.app.mongodb[COLLECTION_NAME].find_one({"_id": new_word.inserted_id})
    return JSONResponse(status_code=status.HTTP_201_CREATED, content=created_word)


@router.get("/{id}", response_description="Get a single word")
async def show_word(id: str, request: Request):
    if (word := await request.app.mongodb[COLLECTION_NAME].find_one({"_id": id})) is not None:
        return WordDB(**word)
    raise HTTPException(status_code=404, detail=f"Word with id={id} not found")
