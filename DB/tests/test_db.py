import unittest
from DB.db_engine import db_engine
from DB.user_management import check_user_exists


class TestDB(unittest.TestCase):
    def test_db_engine(self):
        db_engine.validate_connection()

    def test_check_user_does_not_exists(self):
        self.assertFalse(check_user_exists("this_user_down_not_exist"))


if __name__ == '__main__':
    unittest.main()
