from datetime import datetime, timedelta, UTC
import jwt

from app.config import Config


class JWTHandler:

    @staticmethod
    def create_token(user_id, username):
        """
        Generate a JWT for an authenticated user.
        """
        payload = {
            "user_id": user_id,
            "username": username,
            "exp": datetime.now(UTC) + timedelta(
                minutes=Config.JWT_EXPIRE_MINUTES
            )
        }

        token = jwt.encode(
            payload,
            Config.JWT_SECRET_KEY,
            algorithm=Config.JWT_ALGORITHM
        )

        return token

    @staticmethod
    def verify_token(token):
        """
        Verify the JWT and return the payload if valid.
        """
        try:

            payload = jwt.decode(
                token,
                Config.JWT_SECRET_KEY,
                algorithms=[Config.JWT_ALGORITHM]
            )

            return payload

        except jwt.ExpiredSignatureError:
            return None

        except jwt.InvalidTokenError:
            return None