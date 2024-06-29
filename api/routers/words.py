from fastapi import APIRouter, Request, Body, status, HTTPException, Response
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse
from models import WordBase, WordDB, WordUpdate
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


@router.get("/{id}", response_description="Get a single word")
async def show_word(id: str, request: Request):
    if (word := await request.app.mongodb[COLLECTION_NAME].find_one({"_id": id})) is not None:
        return WordDB(**word)
    raise HTTPException(status_code=404, detail=f"Word with id={id} not found")


@router.post("/", response_description="Add new word")
async def create_word(request: Request, word: WordBase = Body(...)):
    # EUTODO: Handle duplicates in DB
    word = jsonable_encoder(word)
    new_word = await request.app.mongodb[COLLECTION_NAME].insert_one(word)
    created_word = await request.app.mongodb[COLLECTION_NAME].find_one({"_id": new_word.inserted_id})
    return JSONResponse(status_code=status.HTTP_201_CREATED, content=created_word)


@router.patch("/{id}", response_description="Update word")
async def update_word(id: str, request: Request, word: WordUpdate = Body(...)):
    await request.app.mongodb[COLLECTION_NAME].update_one({"_id": id}, {"$set": word.dict(exclude_unset=True)})

    if (word := await request.app.mongodb[COLLECTION_NAME].find_one({"_id": id})) is not None:
        return WordDB(**word)
    raise HTTPException(status_code=404, detail=f"Word with id={id} not found")


@router.delete("/{id}", response_description="Delete word", status_code=204, response_class=Response)
async def delete_word(id: str, request: Request):
    delete_result = await request.app.mongodb[COLLECTION_NAME].delete_one({"_id": id})
    if delete_result.deleted_count == 0:
        raise HTTPException(status_code=404, detail=f"Word with id={id} not found")
