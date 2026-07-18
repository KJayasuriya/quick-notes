from fastapi import APIRouter

from app.schemas.auth import RegisterRequest, LoginRequest
from app.services.auth_service import AuthService

router = APIRouter()


@router.post("/register")
def register(data: RegisterRequest):

    return AuthService.register(
        data.username,
        data.password
    )


@router.post("/login")
def login(data: LoginRequest):

    return AuthService.login(
        data.username,
        data.password
    )