from .db_engine import db_engine

from .db_tables import Job, Structure
from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy import asc, and_, or_, desc
from typing import Optional, Any, Dict, List


from typing import List
import uuid
from ..models import JobModel, JobStatus, CreateJobDTO, UpdateJobDTO
from fastapi import File, UploadFile

from ..util import upload_to_s3, item_to_dict


def get_all_jobs() -> List[JobModel]:
    with Session(db_engine.engine) as session:
        jobs = session.query(Job).all()

    return jobs


def get_all_running_jobs(email: str) -> List[JobModel]:
    status_values = [JobStatus.RUNNING, JobStatus.SUBMITTED]

    with Session(db_engine.engine) as session:
        jobs = session.query(Job).filter(
            Job.userid == email, Job.status.in_(status_values)
        )

    return jobs


def get_all_completed_jobs(email: str) -> List[JobModel]:
    # TODO: update STOPPED to CANCELLED when enum updates
    status_values = [JobStatus.FAILED, JobStatus.STOPPED, JobStatus.COMPLETED]

    with Session(db_engine.engine) as session:
        jobs = (
            session.query(Job)
            .filter(Job.userid == email, Job.status.in_(status_values))
            .all()
        )

    return jobs


def get_completed_jobs_count(email: str, filter: str) -> int:
    if filter == "All":
        status_values = [JobStatus.FAILED, JobStatus.STOPPED, JobStatus.COMPLETED]
    elif filter == "Completed":
        status_values = [JobStatus.COMPLETED]
    elif filter == "Failed":
        # NOTE: failed should include stopped?
        status_values = [JobStatus.FAILED, JobStatus.STOPPED]

    with Session(db_engine.engine) as session:
        total_count = (
            session.query(Job)
            .filter(Job.userid == email, Job.status.in_(status_values))
            .count()
        )

    return total_count


def get_paginated_completed_jobs(
    email: str, limit: int, offset: int, filter: str
) -> List[Job]:
    if filter == "All":
        status_values = [JobStatus.FAILED, JobStatus.STOPPED, JobStatus.COMPLETED]
    elif filter == "Completed":
        status_values = [JobStatus.COMPLETED]
    elif filter == "Failed":
        # NOTE: failed should include stopped?
        status_values = [JobStatus.FAILED, JobStatus.STOPPED]

    with Session(db_engine.engine) as session:
        jobs = (
            session.query(Job)
            .filter(Job.userid == email, Job.status.in_(status_values))
            .order_by(desc(Job.finished))
            .offset(offset)
            .limit(limit)
            .all()
        )

    return jobs


def post_new_job(
    email: str, job: CreateJobDTO, file: UploadFile = File(None)
) -> JobModel:
    with Session(db_engine.engine) as session:
        try:
            # create new row in job table
            job = Job(
                id=uuid.uuid4(),
                userid=email,
                job_name=job.job_name,
                parameters=job.parameters,
            )

            session.add(job)
            session.commit()
            # upload structure file to s3
            upload_to_s3(file, job.id)

            # create new row in structure table
            structure = Structure(
                id=uuid.uuid4(),
                jobid=job.id,
                userid=email,
                name=job.job_name,
                source=job.parameters["source"],
            )

            session.add(structure)
            session.commit()

            session.refresh(job)

            # calculate_energy(job.id, file)

            return item_to_dict(job)
        except SQLAlchemyError as e:
            session.rollback()
            print(f"Error: {str(e)}")
            return False


def update_job(job_id: str, update_job_dto: UpdateJobDTO) -> bool:
    with Session(db_engine.engine) as session:
        try:
            job = session.query(Job).filter_by(id=job_id).first()

            if not job:
                return False

            job.started = update_job_dto.started
            job.finished = update_job_dto.finished
            job.status = update_job_dto.status

            session.commit()

            return True
        except SQLAlchemyError as e:
            session.rollback()
            print(f"Error: {str(e)}")
            return False
