import asyncio
import jwt
from jwt import PyJWTError, ExpiredSignatureError
from datetime import datetime, timedelta, timezone

SECRET_KEY = "your_secret_key"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_DAYS = 7
REFRESH_TOKEN_EXPIRE_DAYS = 30

def create_token(data: dict): 
    encoded_jwt = jwt.encode(data, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def verify_token(token: str, type: str): 
    try: 
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        exp_time = datetime.fromtimestamp(payload["token_exp"], tz=timezone.utc)

        if exp_time < datetime.now(timezone.utc):
            raise ExpiredSignatureError
        
        if payload["token_type"] != type: 
            return {"authorized": False, "error": "Token type mismatch"}
        
        return {"authorized": True, "payload": payload}
        
    except ExpiredSignatureError: 
        return {"authorized": False, "error": "Token expired"}
    except PyJWTError: 
        return {"authorized": False, "error": "Invalid Token"}

async def create_access_token(refresh_token: str): 
    is_authorized = await authorize_token(refresh_token, "refresh")
    authorized_payload = is_authorized["payload"]
    
    if is_authorized["authorized"]:
        to_encode = {"sub": authorized_payload["sub"].copy()}
        expire = datetime.now(timezone.utc) + timedelta(days=ACCESS_TOKEN_EXPIRE_DAYS)

        to_encode.update({"token_exp": expire.timestamp()})
        to_encode.update({"token_type": "access"})

        loop = asyncio.get_event_loop()
        result = await loop.run_in_executor(None, create_token, to_encode)

        return result
    else: 
        raise PyJWTError("Invalid refresh token")

async def create_refresh_token(data: dict): 
    to_encode = {"sub": data.copy()}
    expire = datetime.now(timezone.utc) + timedelta(days=REFRESH_TOKEN_EXPIRE_DAYS)

    to_encode.update({"token_exp": expire.timestamp()})
    to_encode.update({"token_type": "refresh"})

    loop = asyncio.get_event_loop()
    result = await loop.run_in_executor(None, create_token, to_encode)

    return result

async def authorize_token(token: str, type: str):
    loop = asyncio.get_event_loop()
    result = await loop.run_in_executor(None, verify_token, token, type)

    return result
