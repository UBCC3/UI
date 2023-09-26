from fastapi import APIRouter, Depends, FastAPI, Response, status, Body, HTTPException
from fastapi.security import HTTPBearer
from ..database.job_management import (
    get_all_jobs,
    get_all_running_jobs,
    get_all_completed_jobs,
)

from ..models import (
    JobModel,
    JwtErrorModel,
)
from ..util import VerifyToken, token_auth
from typing import Union

router = APIRouter(
    prefix="/jobs",
    tags=["jobs"],
    responses={404: {"description": "Not found"}},
)

token_auth_schema = HTTPBearer()


@router.get("/", response_model=Union[list[JobModel], JwtErrorModel])
async def get_jobs(response: Response, token: str = Depends(token_auth)):
    jobs = get_all_jobs()

    job_dicts = [job.__dict__ for job in jobs]
    # for job_dict in job_dicts:
    #     print("job dict....", job_dict)

    return job_dicts


@router.get("/in-progress", response_model=Union[list[JobModel], JwtErrorModel])
async def get_jobs(email: str, response: Response, token: str = Depends(token_auth)):
    jobs = get_all_running_jobs(email)

    job_dicts = [job.__dict__ for job in jobs]

    return job_dicts


@router.get("/completed", response_model=Union[list[JobModel], JwtErrorModel])
async def get_jobs(email: str, response: Response, token: str = Depends(token_auth)):
    jobs = get_all_completed_jobs(email)

    job_dicts = [job.__dict__ for job in jobs]

    return job_dicts
