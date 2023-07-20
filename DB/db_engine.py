from sqlalchemy import Engine, create_engine, text
from pydantic import BaseModel, PrivateAttr
from DB.entity_names import DB_NAME
import logging
import os


class DB_Engine(BaseModel):
    _engine: Engine = PrivateAttr()

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        host = "webqc.urysegal.com"
        db_username = "ccc"
        db_passwd = os.environ["PG_PASSWD"]

        db_url = f"postgresql://{db_username}:{db_passwd}@{host}/{DB_NAME}"
        self._engine = create_engine(db_url, echo=True)

    @property
    def engine(self) -> Engine:
        return self._engine

    def validate_connection(self):
        with self.engine.connect() as conn:
            result = conn.execute(text("select 'test'"))


handler = logging.FileHandler('/tmp/ubcc3-sql.log')
handler.setLevel(logging.DEBUG)
logger = logging.getLogger('sqlalchemy.engine')
logger.propagate = False
logger.addHandler(handler)

db_engine = DB_Engine()
