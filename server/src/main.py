import asyncio
import uvicorn
from fastapi import FastAPI, Depends

from api import apiRouter
from utils.db import DB, Creds
from api.auth import UserData, authenticate_user

app = FastAPI()
db = DB("mongodb://localhost:27017", "EHR_records")

# initializing creds collection
Creds(db.get_client())

# routers
app.include_router(apiRouter, prefix="/api")

@app.get("/")
async def index(): 
    return ("welcome")

@app.get("/protected")
async def protected_route(user_data: UserData = Depends(authenticate_user)): 
    return user_data

uvicorn.run(app, host="localhost", port=3000)