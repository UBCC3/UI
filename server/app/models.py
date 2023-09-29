from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional, Any, Dict, List
from uuid import UUID

from enum import Enum


class UserModel(BaseModel):
    email: EmailStr
    created: Optional[datetime] = None
    lastlogin: Optional[datetime] = None
    active: Optional[bool] = None
    admin: Optional[bool] = None


class JwtErrorModel(BaseModel):
    status: str
    msg: str


class AvailableCalculationsModel(BaseModel):
    id: int
    name: str


class AvailableBasisSetsModel(BaseModel):
    id: int
    name: str


class AvailableMethodsModel(BaseModel):
    id: int
    name: str


class JobStatus(str, Enum):
    SUBMITTED = "SUBMITTED"
    RUNNING = "RUNNING"
    FAILED = "FAILED"
    # update to cancelled
    STOPPED = "STOPPED"
    COMPLETED = "COMPLETED"


class JobModel(BaseModel):
    id: UUID
    created: datetime
    userid: EmailStr
    job_name: str
    submitted: Optional[datetime] = None
    started: Optional[datetime] = None
    finished: Optional[datetime] = None
    status: JobStatus
    parameters: Optional[Dict[str, Any]] = None


class PaginatedJobModel(BaseModel):
    offset: int
    limit: int
    total_count: int
    data: List[JobModel]
