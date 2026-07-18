from app.models.note import NoteModel


class NoteService:

    @staticmethod
    def create_note(user_id, title, content):
        """
        Create a new note.
        """

        title = title.strip()
        content = content.strip()

        if not title:
            return {
                "success": False,
                "message": "Title cannot be empty."
            }

        if not content:
            return {
                "success": False,
                "message": "Content cannot be empty."
            }

        success = NoteModel.create_note(
            user_id,
            title,
            content
        )

        if not success:
            return {
                "success": False,
                "message": "Failed to create note."
            }

        return {
            "success": True,
            "message": "Note created successfully."
        }

    @staticmethod
    def get_notes(user_id):
        """
        Return all notes of the user.
        """

        notes = NoteModel.get_notes(user_id)

        return {
            "success": True,
            "notes": notes
        }

    @staticmethod
    def update_note(note_id, user_id, title, content):
        """
        Update an existing note.
        """

        title = title.strip()
        content = content.strip()

        if not title:
            return {
                "success": False,
                "message": "Title cannot be empty."
            }

        if not content:
            return {
                "success": False,
                "message": "Content cannot be empty."
            }

        updated = NoteModel.update_note(
            note_id,
            user_id,
            title,
            content
        )

        if not updated:
            return {
                "success": False,
                "message": "Note not found."
            }

        return {
            "success": True,
            "message": "Note updated successfully."
        }

    @staticmethod
    def delete_note(note_id, user_id):
        """
        Delete a note.
        """

        deleted = NoteModel.delete_note(
            note_id,
            user_id
        )

        if not deleted:
            return {
                "success": False,
                "message": "Note not found."
            }

        return {
            "success": True,
            "message": "Note deleted successfully."
        }