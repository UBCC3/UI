from fastapi import (
    APIRouter,
    Depends,
    Response,
    Body,
    HTTPException,
    File,
    UploadFile,
    Form,
)
from fastapi.security import HTTPBearer
from ..database.job_management import (
    get_all_jobs,
    get_all_running_jobs,
    get_all_completed_jobs,
    get_paginated_completed_jobs,
    get_completed_jobs_count,
    post_new_job,
    update_job,
)

import json

from ..models import (
    JobModel,
    JwtErrorModel,
    PaginatedJobModel,
    CreateJobDTO,
    UpdateJobDTO,
)
from ..util import token_auth
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

    return job_dicts


@router.get("/in-progress", response_model=Union[list[JobModel], JwtErrorModel])
async def get_in_progress_jobs(
    email: str, response: Response, token: str = Depends(token_auth)
):
    jobs = get_all_running_jobs(email)

    job_dicts = [job.__dict__ for job in jobs]

    return job_dicts


@router.get("/all-completed", response_model=Union[list[JobModel], JwtErrorModel])
async def get_complete_jobs(
    email: str,
    response: Response,
    token: str = Depends(token_auth),
):
    jobs = get_all_completed_jobs(email)

    job_dicts = [job.__dict__ for job in jobs]

    return job_dicts


@router.get("/completed", response_model=Union[PaginatedJobModel, JwtErrorModel])
async def get_paginated_complete_jobs(
    email: str,
    response: Response,
    token: str = Depends(token_auth),
    limit: int = 5,
    offset: int = 0,
):
    total_count = get_completed_jobs_count(email)

    data = get_paginated_completed_jobs(email, limit, offset)

    return {
        "offset": offset,
        "limit": limit,
        "total_count": total_count,
        "data": data,
    }


@router.post("/", response_model=Union[bool, JwtErrorModel])
async def create_new_job(
    email: str = Form(...),
    job_name: str = Form(...),
    parameters: str = Form(...),
    file: UploadFile = File(None),
    token: str = Depends(token_auth),
):
    job = CreateJobDTO(job_name=job_name, parameters=json.loads(parameters))
    return post_new_job(email, job, file)


@router.patch("/", response_model=Union[bool, JwtErrorModel])
async def patch_job(job_id: str, job: UpdateJobDTO, token: str = Depends(token_auth)):
    res = update_job(job_id, job)

    if not res:
        raise HTTPException(status_code=404, detail="Job not found")
    else:
        return True
