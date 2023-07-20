from DB.db_engine import db_engine
from DB.db_tables import User
from sqlalchemy.orm import Session


def check_user_exists(email: str) -> bool:
    with Session(db_engine.engine) as session:
        exists = session.query(User.email).filter_by(email=email).first() is not None
    return exists


def add_new_user(email: str) -> bool:
    with Session(db_engine.engine) as session:
        user = User(email=email, active=True, admin=False)
        session.add(user)
        session.commit()
    return True


def remove_user(email: str) -> bool:
    with Session(db_engine.engine) as session:
        user_record = session.get(User, email)
        session.delete(user_record)
        session.flush()
        session.commit()

    return True

