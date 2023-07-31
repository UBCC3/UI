# from database.db_engine import db_engine
from .db_engine import db_engine

# from database.db_tables import User
from .db_tables import User
from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError


from ..models import UserModel
from typing import List


def check_user_exists(email: str) -> bool:
    with Session(db_engine.engine) as session:
        exists = session.query(User.email).filter_by(email=email).first() is not None
    return exists


def add_new_user(email: str) -> bool:
    with Session(db_engine.engine) as session:
        try:
            user = User(email=email, active=True, admin=False)
            session.add(user)
            session.commit()

            return True
        except SQLAlchemyError as e:
            session.rollback()
            return f"Error: {str(e)}"


def remove_user(email: str) -> bool:
    with Session(db_engine.engine) as session:
        user_record = session.get(User, email)
        session.delete(user_record)
        session.flush()
        session.commit()

    return True


def get_all_users() -> List[UserModel]:
    with Session(db_engine.engine) as session:
        users = session.query(User).all()

    return users


def update_user(
    user: UserModel,
) -> bool:
    with Session(db_engine.engine) as session:
        try:
            update_user = session.query(User).filter_by(email=user.email).first()

            if not update_user:
                return False

            update_user.lastlogin = user.lastlogin
            session.commit()

            return True
        except SQLAlchemyError as e:
            session.rollback()
            return f"Error: {str(e)}"
