from bson import ObjectId
from typing import Optional
from pydantic import Field, BaseModel, GetJsonSchemaHandler
from typing import Any, Dict
from fastapi.encoders import jsonable_encoder
from pydantic_core import CoreSchema



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
    def __get_pydantic_json_schema__(cls, core_schema: CoreSchema, handler: GetJsonSchemaHandler) -> Dict[str, Any]:
        json_schema = super().__get_pydantic_json_schema__(core_schema, handler)
        json_schema = handler.resolve_ref_schema(json_schema)
        json_schema.update(type='string')
        return json_schema


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
