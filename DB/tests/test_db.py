import unittest
from DB.db_engine import db_engine


class TestDB(unittest.TestCase):
    def test_db_engine(self):
        db_engine.validate_connection()


if __name__ == '__main__':
    unittest.main()
