from bson import ObjectId
from typing import Optional
from pydantic import Field, BaseModel, GetJsonSchemaHandler
from typing import Any, Dict
from fastapi.encoders import jsonable_encoder


# Transform ObjectId into a string representation that will ensure uniqueness
class PyObjectId(ObjectId):
    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, v):
        if not ObjectId.is_valid(v):
            raise ValueError("Invalid objectid")
        return ObjectId(v)

    @classmethod
    def __modify_schema__(cls, field_schema):
        field_schema.update(type="string")


# Extend Pydantic’s BaseModel with the PyObjectId
class MongoBaseModel(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")

    class Config:
        json_encoders = {ObjectId: str}


class WordBase(MongoBaseModel):
    wordName: str = Field(..., min_length=1)
    partOfSpeech: str = Field(..., min_length=4)
    definition: str = Field(..., max_length=255)


class WordUpdate(MongoBaseModel):
    definition: Optional[int] = None


class WordDB(WordBase):
    pass
