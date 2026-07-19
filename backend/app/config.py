import os
from dotenv import load_dotenv

# Load variables from backend/.env
load_dotenv()


class Config:
    # Flask
    SECRET_KEY = os.getenv("SECRET_KEY")

    # JWT
    JWT_SECRET = os.getenv("JWT_SECRET")
    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY")
    JWT_ALGORITHM = os.getenv("JWT_ALGORITHM")
    JWT_EXPIRE_MINUTES = int(os.getenv("JWT_EXPIRE_MINUTES"))
    
    # Database
    DATABASE_URL = os.getenv("DATABASE_URL")