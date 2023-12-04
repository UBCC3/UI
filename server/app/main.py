import os
import sys
from fastapi import Depends, FastAPI
from fastapi.logger import logger
from pydantic_settings import BaseSettings
from fastapi.middleware.cors import CORSMiddleware

from .routers import users, calculations, jobs

import psutil


class Settings(BaseSettings):
    BASE_URL: str = "http://localhost:8000"
    USE_NGROK: bool = os.environ.get("USE_NGROK", "False") == "True"


settings = Settings()


def init_webhooks(base_url):
    # Update inbound traffic via APIs to use the public-facing ngrok URL
    pass


app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:4200"],  # Replace with the URL of your frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

if settings.USE_NGROK:
    # pyngrok should only ever be installed or initialized in a dev environment when this flag is set
    from pyngrok import ngrok

    # Get the dev server port (defaults to 8000 for Uvicorn, can be overridden with `--port`
    # when starting the server
    port = sys.argv[sys.argv.index("--port") + 1] if "--port" in sys.argv else 8000

    # Open a ngrok tunnel to the dev server
    public_url = ngrok.connect(port).public_url
    logger.info('ngrok tunnel "{}" -> "http://127.0.0.1:{}"'.format(public_url, port))

    # Update any base URLs or webhooks to use the public ngrok URL
    settings.BASE_URL = public_url
    init_webhooks(public_url)

app.include_router(users.router)
app.include_router(calculations.router)
app.include_router(jobs.router)


def get_ngrok_url():
    # Check if the USE_NGROK environment variable is set to "True"
    if os.environ.get("USE_NGROK", "False") == "True":
        # Get the process list
        process_list = psutil.process_iter(["pid", "name", "cmdline"])

        # Find the Ngrok process by checking its name
        ngrok_process = next(
            (p for p in process_list if "ngrok" in p.info["name"]), None
        )

        if ngrok_process:
            # Get the public URL of the first Ngrok tunnel
            public_url = ngrok_process.info["cmdline"][-1]
            return public_url
    return None


@app.get("/")
async def root():
    print("public url... ", public_url)
    return {"ngrok_url": public_url}
