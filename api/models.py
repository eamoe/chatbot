from bson import ObjectId
from typing import Optional
from pydantic import Field, BaseModel
from typing import Any, Annotated
from pydantic_core import core_schema
from pydantic.json_schema import JsonSchemaValue


# Transform ObjectId into a string representation that will ensure uniqueness
class PyObjectId(ObjectId):
    @classmethod
    def validate_object_id(cls, v: Any, handler) -> ObjectId:
        if isinstance(v, ObjectId):
            return v

        s = handler(v)
        if ObjectId.is_valid(s):
            return ObjectId(s)
        else:
            raise ValueError("Invalid ObjectId")

    @classmethod
    def __get_pydantic_core_schema__(cls, source_type, _handler) -> core_schema.CoreSchema:
        assert source_type is PyObjectId
        return core_schema.no_info_wrap_validator_function(
            cls.validate_object_id,
            core_schema.str_schema(),
            serialization=core_schema.to_string_ser_schema(),
        )

    @classmethod
    def __get_pydantic_json_schema__(cls, _core_schema, handler) -> JsonSchemaValue:
        return handler(core_schema.str_schema())


# Extend Pydantic’s BaseModel with the PyObjectId
class MongoBaseModel(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")


class WordBase(MongoBaseModel):
    wordName: str = Field(default=..., min_length=1)
    partOfSpeech: str = Field(default=..., min_length=4)
    definition: str = Field(default=...)  # max_length=500


class WordUpdate(MongoBaseModel):
    wordName: str
    partOfSpeech: str
    definition: Optional[str] = None


class WordDB(WordBase):
    pass
