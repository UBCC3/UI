from DB.db_engine import db_engine
from DB.db_tables import User


def check_user_exists(email: str) -> bool:
    exists = db_engine.engine.session.query(User.email_address).filter_by(EMAIL=email).first() is not None
    return exists


def add_new_user(email: str) -> bool:
    with db_engine.engine.session as session:
        user = User(EMAIL=email, ACTIVE=True, ADMIN=False)
        session.add(user)
        session.commit()
    return True


def remove_user(email: str) -> bool:
    with db_engine.engine.session as session:
        user_record = session.get(User, email)
        session.delete(user_record)
        session.flush()
        session.commit()

    return True

