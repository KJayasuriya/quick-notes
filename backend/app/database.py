import psycopg2
from app.config import Config


class Database:

    @staticmethod
    def get_connection():

        try:
            return psycopg2.connect(
                host=Config.DB_HOST,
                port=Config.DB_PORT,
                dbname=Config.DB_NAME,
                user=Config.DB_USER,
                password=Config.DB_PASSWORD
            )

        except Exception as e:
            print(e)
            return None

    @staticmethod
    def get_cursor():

        connection = Database.get_connection()

        if connection is None:
            return None, None

        cursor = connection.cursor()

        return connection, cursor

    @staticmethod
    def close(connection, cursor=None):

        if cursor:
            cursor.close()

        if connection:
            connection.close()