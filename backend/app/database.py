import oracledb
from app.config import Config


class Database:

    @staticmethod
    def get_connection():
        """
        Returns an Oracle database connection.
        """

        try:

            dsn = (
                f"{Config.ORACLE_HOST}:"
                f"{Config.ORACLE_PORT}/"
                f"{Config.ORACLE_SERVICE}"
            )

            connection = oracledb.connect(
                user=Config.ORACLE_USER,
                password=Config.ORACLE_PASSWORD,
                dsn=dsn
            )
            # connection.defaults.fetch_lobs = False
            return connection

        except oracledb.Error as e:
            print("Database Connection Error:")
            print(e)
            return None

    @staticmethod
    def get_cursor():
        """
        Returns
            connection,
            cursor
        """

        connection = Database.get_connection()

        if connection is None:
            return None, None

        cursor = connection.cursor()

        return connection, cursor

    @staticmethod
    def close(connection, cursor=None):

        if cursor is not None:
            cursor.close()

        if connection is not None:
            connection.close()