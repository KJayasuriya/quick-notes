from app.security.jwt_handler import JWTHandler

token = JWTHandler.create_token(
    user_id=1,
    username="jk"
)

print("Token:")
print(token)

print()

payload = JWTHandler.verify_token(token)

print("Payload:")
print(payload)