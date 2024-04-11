import asyncio
import jwt
from jwt import PyJWTError, ExpiredSignatureError
from datetime import datetime, timedelta, timezone

SECRET_KEY = "your_secret_key"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60
REFRESH_TOKEN_EXPIRE_DAYS = 30

def create_token(data: dict, delta: timedelta): 
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + delta

    to_encode.update({"exp": expire.timestamp()})

    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def verify_token(token: str): 
    try: 
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        exp_time = datetime.fromtimestamp(payload["exp"], tz=timezone.utc)

        if exp_time < datetime.now(timezone.utc):
            raise ExpiredSignatureError
        
        return {"authorized": True, "payload": payload}
        
    except ExpiredSignatureError: 
        return {"authorized": False, "error": "Token expired"}
    except PyJWTError: 
        return {"authorized": False, "error": "Invalid Token"}

async def create_refresh_token(data: dict): 
    loop = asyncio.get_event_loop()
    result = await loop.run_in_executor(None, create_token, data, timedelta(days=REFRESH_TOKEN_EXPIRE_DAYS))

    return result

async def create_access_token(data: dict): 
    loop = asyncio.get_event_loop()
    result = await loop.run_in_executor(None, create_token, data, timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))

    return result

async def authorize_token(token: str):
    loop = asyncio.get_event_loop()
    result = await loop.run_in_executor(None, verify_token, token)

    return result
