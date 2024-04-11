from motor.motor_asyncio import AsyncIOMotorClient

class DbError (Exception):
    pass

class ConnectionNotEstablished(DbError):
    def __init__(self): 
        self.message = f"Cannot find any connection to the database!"
        super().__init__(self.message) 

class DB(): 
    def __init__(self, url, db_name) -> None:
        self.url = url
        self.db_name = db_name 
        self.client = None 
        
    def _connect(self): 
        client = AsyncIOMotorClient("mongodb://localhost:27017")
        db = client["EHR_records"]
        
        self.client = db
        
    def get_client(self): 
        if (self.client is None): 
            self._connect()
        
        return self.client
    
class CollectionManager(): 
    _instance = None 
    
    def __init__(self, db_conn = None): 
        if (db_conn is None): 
            raise ConnectionNotEstablished

    def __new__(cls, *args, **kwargs):
        if (cls._instance is None): 
            cls._instance = super().__new__(cls)
            
        return cls._instance
    
    @classmethod
    def get_instance(cls): 
        if cls._instance is None: 
            raise ConnectionNotEstablished
        
        return cls._instance