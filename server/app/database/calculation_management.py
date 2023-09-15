from .db_engine import db_engine

from .db_tables import Available_Basis_Sets, Available_Calculations, Available_Methods
from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError

from typing import List
from ..models import (
    AvailableBasisSetsModel,
    AvailableCalculationsModel,
    AvailableMethodsModel,
)


def get_all_available_calculations() -> List[AvailableCalculationsModel]:
    with Session(db_engine.engine) as session:
        available_calculations = session.query(Available_Calculations).all()

    return available_calculations


def get_all_available_basis_sets() -> List[AvailableBasisSetsModel]:
    with Session(db_engine.engine) as session:
        available_basis_sets = session.query(Available_Basis_Sets).all()

    return available_basis_sets


def get_all_available_methods() -> List[AvailableMethodsModel]:
    with Session(db_engine.engine) as session:
        available_methods = session.query(Available_Methods).all()

    return available_methods
