""" 
function: insert_user (username: str, password: str) -> None
    # password: hashed form
    # insert in creds collection

    # exceptions: 
        conflict: username already exists
        cannot insert in database

function: update_user (username: str, password: str) -> 
    # password: hashed form
    # update in creds collection

    # exceptions: 
        cannot update in database


function: fetch_user (username: str) -> dict
    # fetch user from creds collection

    # exception: 
        not found: no document with username: username
"""


import asyncio
from pymongo import MongoClient
from motor.motor_asyncio import AsyncIOMotorClient

class DbError (Exception):
    pass

class UserConflict(DbError):
    def __init__(self, username ) -> None:
        self.message = f"User: {username} already exists!"
        super().__init__(self.message) 

class UserNotFound(DbError):
    def __init__(self, username) -> None:
        self.message = f"User: {username} not found!"
        super().__init__(self.message)
    
client = AsyncIOMotorClient("mongodb://localhost:27017")
db = client["EHR_records"]
creds_collection = db["credentials"]

async def _get(username: str): 
    document = await creds_collection.find_one({"username": username})
    return document

async def _insert(document: dict): 
    result = await creds_collection.insert_one(document)
    return result

async def get_credentials(username: str):

    document = await _get(username)
    if document is None:
        raise UserNotFound(username)
    
    return document

async def insert_credentials(username: str, password: str):

    user_exists = await _get(username)

    if (user_exists is None): 
        document = {"username": username, "password": password}
        result = await _insert(document)

        return result
    else: 
        raise UserConflict(username)
        

async def main():
    result = await get_credentials("user2")
    print(result)

asyncio.run(main())

