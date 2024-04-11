from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from utils.db import Creds, UserConflict, UserNotFound
from .utils import hash_password, check_password 

class UserCredentials(BaseModel): 
    username: str
    password: str

app = APIRouter()

@app.post("/register")
async def register_user(user_creds: UserCredentials): 
    creds_manager = Creds.get_instance()
    hashed_pass = await hash_password(user_creds.password)

    try: 
        result = await creds_manager.insert_user(user_creds.username, hashed_pass)
    except UserConflict: 
        raise HTTPException(status_code=409, detail="Conflict: username already exists")

    return {"Success"}

@app.post("/login")
async def login_user(user_creds: UserCredentials): 
    creds_manager = Creds.get_instance()

    try: 
        result = await creds_manager.fetch_user(user_creds.username)
    except UserNotFound: 
        raise HTTPException(status_code=404, detail="Not found: username not found")

    authorized = await check_password(user_creds.password, result["password"])
    if not authorized: 
        raise HTTPException(status_code=403, detail="Unauthorized: Invalid username and password")

    return {"Success"}
