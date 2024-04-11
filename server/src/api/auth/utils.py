import bcrypt
import asyncio

async def hash_password(string: str) -> str: 

    def generate_hash(string): 
        return bcrypt.hashpw(string.encode("utf-8"), bcrypt.gensalt())

    loop = asyncio.get_event_loop()
    result = await loop.run_in_executor(None, generate_hash, string)

    return result

async def check_password(string: str, hashed_string: str) -> bool: 
    
    def check(string, hashed_string): 
        return bcrypt.checkpw(string.encode("utf-8"), hashed_string)

    loop = asyncio.get_event_loop()
    result = await loop.run_in_executor(None, check, string, hashed_string)

    return result
