from .db_engine import db_engine

from .db_tables import Job
from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy import asc, and_, or_


from typing import List
from ..models import JobModel, JobStatus


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
