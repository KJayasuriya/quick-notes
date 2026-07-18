from pydantic import BaseModel, Field, field_validator
import re


class RegisterRequest(BaseModel):
    username: str = Field(..., min_length=3, max_length=50)
    password: str

    @field_validator("password")
    @classmethod
    def validate_password(cls, value):

        if len(value) < 8:
            raise ValueError(
                "Password must contain at least 8 characters."
            )

        if not re.search(r"[A-Z]", value):
            raise ValueError(
                "Password must contain an uppercase letter."
            )

        if not re.search(r"[a-z]", value):
            raise ValueError(
                "Password must contain a lowercase letter."
            )

        if not re.search(r"\d", value):
            raise ValueError(
                "Password must contain a number."
            )

        if not re.search(r"[!@#$%^&*()_+=\-{}\[\]:;\"'<>,.?/\\|~`]", value):
            raise ValueError(
                "Password must contain a special character."
            )

        return value


class LoginRequest(BaseModel):
    username: str
    password: str