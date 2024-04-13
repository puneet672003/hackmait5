import asyncio
import uvicorn
from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware

from api import apiRouter
from utils.db import DB, Creds
from api.auth import UserData, authenticate_user

app = FastAPI()
db = DB("mongodb://localhost:27017", "EHR_records")

# initializing creds collection
Creds(db.get_client())

# middlewares
# origins = [
#     "http://http://localhost:8081/",  # Your frontend URL
# ]
# app.add_middleware(
#     CORSMiddleware, 
#     allow_origins=origins,
#     allow_credentials=True,
#     allow_methods=["GET", "POST", "PUT", "DELETE"],
#     allow_headers=["*"]
# )

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change to ["http://localhost"] if you only want to allow localhost
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# routers
app.include_router(apiRouter, prefix="/api")

@app.get("/")
async def index(): 
    return ("welcome")

@app.get("/protected")
async def protected_route(user_data: UserData = Depends(authenticate_user)): 
    return user_data

uvicorn.run(app, host="localhost", port=3000)