from app.database import Database


class NoteModel:

    @staticmethod
    def create_note(user_id, title, content):

        connection, cursor = Database.get_cursor()

        if connection is None:
            return False

        try:

            cursor.execute("""
                INSERT INTO notes
                (
                    user_id,
                    title,
                    content
                )
                VALUES
                (
                    %s,
                    %s,
                    %s
                )
            """, (
                user_id,
                title,
                content
            ))

            connection.commit()

            return True

        except Exception as e:
            print(e)
            connection.rollback()
            return False

        finally:
            Database.close(connection, cursor)

    @staticmethod
    def get_notes(user_id):

        connection, cursor = Database.get_cursor()

        if connection is None:
            return []

        try:

            cursor.execute("""
                SELECT
                    id,
                    title,
                    content,
                    created_at,
                    updated_at
                FROM notes
                WHERE user_id = %s
                ORDER BY updated_at DESC
            """, (user_id,))

            rows = cursor.fetchall()

            notes = []

            for row in rows:

                notes.append({
                    "id": row[0],
                    "title": row[1],
                    "content": row[2],
                    "created_at": row[3].strftime("%Y-%m-%d %H:%M:%S"),
                    "updated_at": row[4].strftime("%Y-%m-%d %H:%M:%S")
                })

            return notes

        except Exception as e:
            print(e)
            return []

        finally:
            Database.close(connection, cursor)

    @staticmethod
    def update_note(note_id, user_id, title, content):

        connection, cursor = Database.get_cursor()

        if connection is None:
            return False

        try:

            cursor.execute("""
                UPDATE notes
                SET
                    title = %s,
                    content = %s,
                    updated_at = CURRENT_TIMESTAMP
                WHERE
                    id = %s
                AND
                    user_id = %s
            """, (
                title,
                content,
                note_id,
                user_id
            ))

            connection.commit()

            return cursor.rowcount > 0

        except Exception as e:
            print(e)
            connection.rollback()
            return False

        finally:
            Database.close(connection, cursor)

    @staticmethod
    def delete_note(note_id, user_id):

        connection, cursor = Database.get_cursor()

        if connection is None:
            return False

        try:

            cursor.execute("""
                DELETE FROM notes
                WHERE
                    id = %s
                AND
                    user_id = %s
            """, (
                note_id,
                user_id
            ))

            connection.commit()

            return cursor.rowcount > 0

        except Exception as e:
            print(e)
            connection.rollback()
            return False

        finally:
            Database.close(connection, cursor)