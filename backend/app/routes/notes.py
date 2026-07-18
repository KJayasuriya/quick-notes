from fastapi import APIRouter, Depends

from app.dependencies.auth import get_current_user
from app.schemas.note import CreateNoteRequest
from app.schemas.note import UpdateNoteRequest
from app.services.note_service import NoteService

router = APIRouter()


@router.get("/notes")
def get_notes(
    user=Depends(get_current_user)
):
    return NoteService.get_notes(
        user["user_id"]
    )


@router.post("/notes")
def create_note(
    note: CreateNoteRequest,
    user=Depends(get_current_user)
):

    return NoteService.create_note(
        user["user_id"],
        note.title,
        note.content
    )


@router.put("/notes/{note_id}")
def update_note(
    note_id: int,
    note: UpdateNoteRequest,
    user=Depends(get_current_user)
):

    return NoteService.update_note(
        note_id,
        user["user_id"],
        note.title,
        note.content
    )


@router.delete("/notes/{note_id}")
def delete_note(
    note_id: int,
    user=Depends(get_current_user)
):

    return NoteService.delete_note(
        note_id,
        user["user_id"]
    )