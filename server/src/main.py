import asyncio
import uvicorn
from fastapi import FastAPI

from api import apiRouter
from utils.db import DB, Creds

app = FastAPI()
db = DB("mongodb://localhost:27017", "EHR_records")

# initializing creds collection
Creds(db.get_client())

# routers
app.include_router(apiRouter, prefix="/api")

@app.get("/")
async def index(): 
    return ("welcome")

uvicorn.run(app, host="localhost", port=3000)