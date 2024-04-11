from motor.motor_asyncio import AsyncIOMotorClient
from .db import DbError, CollectionManager

class UserConflict(DbError):
    def __init__(self, username ) -> None:
        self.message = f"User: {username} already exists!"
        super().__init__(self.message) 

class UserNotFound(DbError):
    def __init__(self, username) -> None:
        self.message = f"User: {username} not found!"
        super().__init__(self.message)
        
        
class Creds(CollectionManager): 
    
    def __init__(self, db): 
        super().__init__(db)
        self.collection = db["credentials"]
        
    async def _fetch(self, username: str): 
        document = await self.collection.find_one({"username": username})
        return document
    
    async def _insert(self, document: dict):
        result = await self.collection.insert_one(document)
        return result

    async def fetch_user(self, username: str) -> dict: 
        document = await self._fetch(username)
        
        if document is None:
            raise UserNotFound(username)
        
        return document
    
    async def insert_user(self, username: str, password: str) -> dict: 
        user_exists = await self._fetch(username)
        
        if (user_exists is None): 
            document = {"username": username, "password": password}
            result = await self._insert(document)

            return result
        else: 
            raise UserConflict(username)
