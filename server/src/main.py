import uvicorn
from fastapi import FastAPI

from api import apiRouter

app = FastAPI()

# routers
app.include_router(apiRouter, prefix="/api")

@app.get("/")
async def index(): 
    return ("welcome")

uvicorn.run(app, host="localhost", port=3000)