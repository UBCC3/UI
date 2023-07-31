from fastapi import APIRouter, Depends, FastAPI, Response, status, Body, HTTPException
from fastapi.security import HTTPBearer
from ..database.user_management import (
    check_user_exists,
    add_new_user,
    remove_user,
    get_all_users,
    update_user,
)
from ..database.db_tables import User
from ..models import UserModel

from datetime import datetime
from ..util import VerifyToken


router = APIRouter(
    prefix="/users",
    tags=["users"],
    responses={404: {"description": "Not found"}},
)

token_auth_schema = HTTPBearer()


@router.get(
    "/",
)
async def get_users(response: Response, token: str = Depends(token_auth_schema)):
    result = VerifyToken(token.credentials).verify()

    if result.get("status"):
        response.status_code = status.HTTP_400_BAD_REQUEST
        return result
    return get_all_users()


@router.get("/user-exists", response_model=bool)
async def get_user_exists(
    email: str, response: Response, token: str = Depends(token_auth_schema)
):
    result = VerifyToken(token.credentials).verify()

    if result.get("status"):
        response.status_code = status.HTTP_400_BAD_REQUEST
        return result

    return check_user_exists(email)


@router.post("/", response_model=UserModel)
async def create_user(
    user: UserModel, response: Response, token: str = Depends(token_auth_schema)
):
    result = VerifyToken(token.credentials).verify()
    # TODO: update user schema to include auth type (email or social)

    if result.get("status"):
        response.status_code = status.HTTP_400_BAD_REQUEST
        return result

    user_exists = check_user_exists(user.email)
    if user_exists:
        raise HTTPException(status_code=400, detail="Email already registered")

    new_user = add_new_user(user.email)
    return new_user.__dict__


@router.patch("/", response_model=UserModel)
async def patch_user(
    user: UserModel, response: Response, token: str = Depends(token_auth_schema)
):
    result = VerifyToken(token.credentials).verify()

    if result.get("status"):
        response.status_code = status.HTTP_400_BAD_REQUEST
        return result

    res = update_user(user)

    if not res:
        raise HTTPException(status_code=404, detail="User not found")
    else:
        return update_user(user)
