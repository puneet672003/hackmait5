from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from .utils import hash_password, check_password

class UserCredentials(BaseModel): 
    username: str
    password: str

app = APIRouter()

@app.post("/register")
async def register_user(user_creds: UserCredentials): 
    hashed_pass = await hash_password(user_creds.password)
    return {"username": user_creds.username, "hashed_pass": hashed_pass}

@app.post("/login")
async def login_user(username: str, password: str): 
    pass