import bcrypt


class PasswordHasher:
    @staticmethod
    def hash_password(password: str) -> str:
        """
        Hash a plain-text password.
        """

        password_bytes = password.encode("utf-8")

        salt = bcrypt.gensalt()

        hashed = bcrypt.hashpw(password_bytes, salt)

        return hashed.decode("utf-8")

    @staticmethod
    def verify_password(password: str, hashed_password: str) -> bool:
        """
        Compare a plain-text password with its hash.
        """

        return bcrypt.checkpw(
            password.encode("utf-8"),
            hashed_password.encode("utf-8")
        )