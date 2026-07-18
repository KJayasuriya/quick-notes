from app.models.user import UserModel
from app.security.hashing import PasswordHasher
from app.security.jwt_handler import JWTHandler

class AuthService:

    @staticmethod
    def register(username, password):
        """
        Register a new user.
        """

        # Check if username already exists
        user = UserModel.find_by_username(username)

        if user is not None:
            return {
                "success": False,
                "message": "Username already exists."
            }

        # Hash password
        pwd_hash = PasswordHasher.hash_password(password)

        # Save user
        success = UserModel.create_user(
            username,
            pwd_hash
        )

        if not success:
            return {
                "success": False,
                "message": "Failed to create user."
            }

        return {
            "success": True,
            "message": "Registration successful."
        }

    @staticmethod
    def login(username, password):
        """
        Verify user credentials.
        """

        user = UserModel.find_by_username(username)

        if user is None:
            return {
                "success": False,
                "message": "Invalid username or password."
            }

        valid = PasswordHasher.verify_password(
            password,
            user["pwd_hash"]
        )

        if not valid:
            return {
                "success": False,
                "message": "Invalid username or password."
            }

        token = JWTHandler.create_token(
            user["id"],
            user["username"]
        )

        return {
            "success": True,
            "message": "Login successful.",
            "token": token,
            "user": {
                "id": user["id"],
                "username": user["username"]
            }
        }