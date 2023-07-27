import unittest
from database.db_engine import db_engine
from database.user_management import check_user_exists, add_new_user, remove_user


class TestDB(unittest.TestCase):
    def test_db_engine(self):
        db_engine.validate_connection()

    def test_check_user_does_not_exists(self):
        self.assertFalse(check_user_exists("this_user_does_not_exist"))

    def test_add_and_remove_user(self):
        # TODO: update test to reflect new return type from add user
        username_for_test = "test_user@test_domain.com"
        if check_user_exists(username_for_test):
            self.assertTrue(remove_user(username_for_test))

        self.assertTrue(add_new_user(username_for_test))
        self.assertTrue(remove_user(username_for_test))


if __name__ == "__main__":
    unittest.main()
