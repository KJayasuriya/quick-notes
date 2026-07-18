from pydantic import BaseModel, Field


class CreateNoteRequest(BaseModel):
    title: str = Field(
        ...,
        min_length=1,
        max_length=150
    )

    content: str = Field(
        ...,
        min_length=1
    )


class UpdateNoteRequest(BaseModel):
    title: str = Field(
        ...,
        min_length=1,
        max_length=150
    )

    content: str = Field(
        ...,
        min_length=1
    )