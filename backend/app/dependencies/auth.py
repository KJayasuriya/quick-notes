from fastapi import Header, HTTPException
from app.security.jwt_handler import JWTHandler


def get_current_user(authorization: str = Header(None)):
    """
    Extract user information from JWT.
    """

    if authorization is None:
        raise HTTPException(
            status_code=401,
            detail="Authorization header missing."
        )

    if not authorization.startswith("Bearer "):
        raise HTTPException(
            status_code=401,
            detail="Invalid authorization header."
        )

    token = authorization.split(" ")[1]

    payload = JWTHandler.verify_token(token)

    if payload is None:
        raise HTTPException(
            status_code=401,
            detail="Invalid or expired token."
        )

    return payload