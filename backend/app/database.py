import psycopg2
from app.config import Config
import traceback

class Database:

    @staticmethod
    def get_connection():
        print("HOST =", Config.DB_HOST)
        print("PORT =", Config.DB_PORT)
        print("DB   =", Config.DB_NAME)
        print("USER =", Config.DB_USER)
        try:
            return psycopg2.connect(
                host=Config.DB_HOST,
                port=Config.DB_PORT,
                dbname=Config.DB_NAME,
                user=Config.DB_USER,
                password=Config.DB_PASSWORD,
                sslmode="require"
            )

         except Exception as e:
            print("=" * 60)
            print("DATABASE CONNECTION FAILED")
            print(e)
            traceback.print_exc()
            print("=" * 60)
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