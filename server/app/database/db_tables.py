from sqlalchemy import Table
from sqlalchemy.ext.declarative import declarative_base
from .entity_names import (
    USERS_TABLE_NAME,
    JOBS_TABLE_NAME,
    STRUCTURES_TABLE_NAME,
    STRUCTURE_PROPERTIES_TABLE_NAME,
    JOB_TAGS_TABLE_NAME,
)
from .db_engine import db_engine


Base = declarative_base()


class User(Base):
    __table__ = Table(USERS_TABLE_NAME, Base.metadata, autoload_with=db_engine.engine)


class Job(Base):
    __table__ = Table(JOBS_TABLE_NAME, Base.metadata, autoload_with=db_engine.engine)


class Structure(Base):
    __table__ = Table(
        STRUCTURES_TABLE_NAME, Base.metadata, autoload_with=db_engine.engine
    )


class Structure_Property(Base):
    __table__ = Table(
        STRUCTURE_PROPERTIES_TABLE_NAME, Base.metadata, autoload_with=db_engine.engine
    )


class Job_Tags(Base):
    __table__ = Table(
        JOB_TAGS_TABLE_NAME, Base.metadata, autoload_with=db_engine.engine
    )
