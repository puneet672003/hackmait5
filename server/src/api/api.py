from fastapi import APIRouter

from .auth import authRouter

app = APIRouter()

# routers
app.include_router(authRouter, prefix="/auth")