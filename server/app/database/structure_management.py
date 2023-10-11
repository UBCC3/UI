from .db_engine import db_engine

from .db_tables import Structure
from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy import asc, and_, or_, desc
from typing import Optional, Any, Dict, List

import uuid
from ..models import StructureModel, StructureOrigin


def post_structure(
    jobid: uuid.uuid4,
    userid: str,
    structure_name: str,
    structure_origin: StructureOrigin,
) -> bool:
    with Session(db_engine.engine) as session:
        try:
            structure = Structure(
                id=uuid.uuid4(),
                jobid=jobid,
                userid=userid,
                name=structure_name,
                source=structure_origin,
            )
            session.add(structure)
            session.commit()
            return True
        except SQLAlchemyError as e:
            print("error")
            session.rollback()
            print(f"Error: {str(e)}")
            return False


def get_structure(id: uuid.uuid4) -> StructureModel:
    with Session(db_engine.engine) as session:
        structure = session.query(Structure).filter(id=id).first()

    return structure
