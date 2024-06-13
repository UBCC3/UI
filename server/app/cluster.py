
import json
import subprocess

from fastapi import HTTPException
from sqlalchemy.orm import Session
from typing import Dict
from uuid import UUID

from database.db_engine import db_engine
from database.db_tables import Job
from models import JobStatus


def interaction_with_cluster():
    jobs_dict = get_all_running_jobs_as_dict()
    
    ssh_command = "ssh cluster 'python3 check_status.py"
    
    try:
        process = subprocess.Popen(
            ssh_command, shell=True, stdin=subprocess.PIPE, text=True
        )
        process.communicate(input=json.dumps(jobs_dict))
        
        # TODO: handle the result send back from the cluster
     
    except subprocess.CalledProcessError as e:
        raise HTTPException(status_code=404, detail=str(e))
    
    
            
def get_all_running_jobs_as_dict() -> Dict[UUID, int]:
    status_values = [JobStatus.RUNNING, JobStatus.SUBMITTED]
    jobs_dict = {}
    
    with Session(db_engine.engine) as session:
        jobs = session.query(Job).filter(
            Job.status.in_(status_values)
        )
        for job in jobs:
            jobs_dict[job.id] = 0
            
    return jobs_dict
