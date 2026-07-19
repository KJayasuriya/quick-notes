from app.database import Database


class UserModel:

    @staticmethod
    def create_user(username, pwd_hash):
        """
        Insert a new user into the database.
        """

        connection, cursor = Database.get_cursor()

        try:
            cursor.execute("""
                INSERT INTO users (username, pwd_hash)
                VALUES (%s, %s)
            """, (username, pwd_hash))

            connection.commit()

            return True

        except Exception as e:
            connection.rollback()
            print(e)
            return False

        finally:
            Database.close(connection, cursor)

    @staticmethod
    def find_by_username(username):
        """
        Find a user by username.
        """

        connection, cursor = Database.get_cursor()

        try:

            cursor.execute("""
                SELECT
                    id,
                    username,
                    pwd_hash,
                    created_at
                FROM users
                WHERE username = %s
            """, (username,))

            row = cursor.fetchone()

            if row is None:
                return None

            return {
                "id": row[0],
                "username": row[1],
                "pwd_hash": row[2],
                "created_at": row[3]
            }

        finally:
            Database.close(connection, cursor)

    @staticmethod
    def get_user_by_id(user_id):

        connection, cursor = Database.get_cursor()

        try:

            cursor.execute("""
                SELECT
                    id,
                    username,
                    created_at
                FROM users
                WHERE id = %s
            """, (user_id,))

            row = cursor.fetchone()

            if row is None:
                return None

            return {
                "id": row[0],
                "username": row[1],
                "created_at": row[2]
            }

        finally:
            Database.close(connection, cursor)