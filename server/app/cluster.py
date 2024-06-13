
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
    json_data = json.dumps(jobs_dict)
    
    ssh_command = ["ssh", "cluster", "python3 check_status.py"]
    
    try:
        result = subprocess.run(ssh_command, capture_output=True, text=True, check=True)
        process = subprocess.Popen(
            ssh_command,
            stdin=subprocess.PIPE,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True
        )
        stdout, stderr = process.communicate(input=json_data)
        if process.returncode != 0:
            raise HTTPException(status_code=500, detail=stderr)
        returned_data = json.loads(stdout)
        #TODO: process the data

    except subprocess.CalledProcessError as e:
        raise HTTPException(status_code=500, detail=str(e))
        
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
