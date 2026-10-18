from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pwdlib import PasswordHash
from pydantic import BaseModel

from modules.jfile import jfile

class LoginData(BaseModel):
    name: str
    password: str

class RegData(BaseModel):
    name: str
    email: str
    password: str

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://workhours-site.onrender.com"
    ],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

data_users = "data/users.json"

hash = PasswordHash.recommended()

try:
    users = jfile.read(data_users)
    print("Файл", data_users, "підключено.")
except FileNotFoundError:
    users = []
    jfile.create(data_users, users)
    print("Файл", data_users, "створено.")

@app.post("/login")
async def login(data: LoginData):
    for user in users:
        if user["name"] == data.name:
            if hash.verify(data.password, user["pass"]):
                return {"success": True, "message": "Авторизація успішна"}
            else:
                return {"success": False, "message": "Неправильний пароль"}
    return {"success": False, "message": "Користувача не знайдено"}

@app.post("/reg")
async def login(data: RegData):
    existUser = False
    for user in users:
        if user["name"] == data.name:
            existUser = True
    print(existUser)
    if existUser == False:
        hashed = hash.hash(data.password)
        users.append({
            "name": data.name,
            "email": data.email,
            "pass": hashed
        })
        jfile.write(data_users, users)
        return {"success": True, "message": "Реєстрація успішна"}
    else:
        return {"success": False, "message": "Користувач існує"}

# uvicorn main:app --reload
