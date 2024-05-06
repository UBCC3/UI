import os
import sys
from fastapi import Depends, FastAPI
from fastapi.logger import logger
from pydantic_settings import BaseSettings
from fastapi.middleware.cors import CORSMiddleware

from .routers import users, calculations, jobs, structures

import psutil


class Settings(BaseSettings):
    BASE_URL: str = "http://localhost:8000"

settings = Settings()


app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:4200"],  # Replace with the URL of frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(users.router)
app.include_router(calculations.router)
app.include_router(jobs.router)
app.include_router(structures.router)

@app.get("/")
async def root():
    return 'hello world'
