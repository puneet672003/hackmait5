from fastapi import APIRouter, HTTPException, Depends
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from pydantic import BaseModel
from typing import Annotated

from utils.db import Creds, UserConflict, UserNotFound
from utils.auth import hash_password, check_password
from utils.auth import create_refresh_token, create_access_token, authorize_token

app = APIRouter()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl=f"/api/auth/login")

class UserData(BaseModel): 
    username: str

class UserCredentials(BaseModel): 
    username: str
    password: str
    
async def authenticate_user(token: Annotated[str, Depends(oauth2_scheme)]): 
    payload_data = await authorize_token(token, "access")

    if not payload_data["authorized"]: 
        raise HTTPException(status_code=401, detail="Unauthorized: Invalid token")

    else: 
        return payload_data["payload"]["sub"]
    
@app.get("/me")
async def me(user_data: Annotated[UserData, Depends(authenticate_user)]): 
    return user_data

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
        raise HTTPException(status_code=401, detail="Unauthorized: Invalid username and password")

    refresh_token = await create_refresh_token({"username": user_creds.username})
    access_token = await create_access_token(refresh_token)

    return {"refresh_token": refresh_token, "access_token": access_token}

@app.post("/refresh")
async def refresh_token(refresh_token: Annotated[str, Depends(oauth2_scheme)]): 
    payload_data = await authorize_token(refresh_token, "refresh")

    if not payload_data["authorized"]: 
        raise HTTPException(status_code=401, detail="Unauthorized: Invalid token")
    else: 
        new_refresh_token = await create_refresh_token(payload_data["payload"]["sub"])
        access_token = await create_access_token(new_refresh_token)

        return {"refresh_token": new_refresh_token, "access_token": access_token}