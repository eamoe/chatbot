import shutil
from pydantic import BaseModel
from typing import Dict
from enum import Enum
from fastapi import FastAPI, Path, Body, Request, Header, Form, File, UploadFile, status, HTTPException


class AccountType(str, Enum):
    FREE = "free"
    PRO = "pro"


class InsertCar(BaseModel):
    brand: str
    model: str
    year: int


class InsertUser(BaseModel):
    username: str
    name: str


app = FastAPI()


@app.get("/", status_code=status.HTTP_208_ALREADY_REPORTED)
# @app.get("/")
async def root():
    return {"message": "Hello FastAPI"}


@app.post("/")
async def post_root():
    return {"message": "Post request success"}


@app.get("/car/{id}")
async def root(id):
    return {"car_id": id}


@app.get("/carh/{id}")
async def hinted_car_id(id: int):
    return {"car_id": id}


# http://localhost:8000/account/free/12
@app.get("/account/{acc_type}/{months}")
async def account(acc_type: AccountType, months: int = Path(..., ge=3, le=12)):
    return {
        "message": "Account created",
        "account_type": acc_type,
        "months": months
    }


# http://localhost:8000/cars/price?min_price=2000&max_price=4000
@app.get("/cars/price")
async def cars_by_price(min_price: int = 0, max_price: int = 100000):
    return {"Message": f"Listing cars with prices between {min_price} and {max_price}"}


# http://localhost:8000/cars
# {"brand":"FIAT", "model":"500", "year":"2015"}
@app.post("/cars")
async def new_car(data: Dict = Body(...)):
    print(data)
    return {
        "message": data
    }


# http://localhost:8000/car/user/
# {"car": {"brand":"FIAT", "model":"500", "year":"2015"},
# "user": {"username": "eugene", "name": "Eugene"},
# "code": 72357893495}
@app.post("/car/user")
async def new_car_model(car: InsertCar,
                        user: InsertUser,
                        code: int = Body(None)):
    return {
        "car": car,
        "user": user,
        "code": code
    }


# http://localhost:8000/requests/
@app.get("/requests")
async def raw_request(request: Request):
    return {
        "message": request.base_url,
        "all": dir(request)
    }


# http://localhost:8000/headers/
@app.get("/headers")
async def read_headers(user_agent: str | None = Header(None)):
    return {"User-Agent": user_agent}


@app.post("/upload")
async def upload(file: UploadFile = File(...), brand: str = Form(...), model: str = Form(...)):
    return {
        "brand": brand,
        "model": model,
        "file_name": file.filename}


# We could use some randomly generated filename while using the UUID library, for example.
# File uploading is an operation that you probably won’t be doing this way
# – file uploads can be handled by the Python async file library known as `aiofiles` or as a background task,
# which is another feature of FastAPI.
@app.post("/upload_save")
async def upload(picture: UploadFile = File(...), brand: str = Form(...), model: str = Form(...)):
    with open("saved_file.png", "wb") as buffer:
        shutil.copyfileobj(picture.file, buffer)
    return {
        "brand": brand,
        "model": model,
        "file_name": picture.filename
        }


@app.post("/carsmodel")
async def new_car_model(car: InsertCar):
    if car.year > 2024:
        raise HTTPException(status.HTTP_406_NOT_ACCEPTABLE, detail="The car doesn’t exist yet!")
    return {
        "message": car
    }
