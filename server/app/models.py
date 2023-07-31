from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional


class UserModel(BaseModel):
    email: EmailStr
    created: Optional[datetime] = None
    lastlogin: Optional[datetime] = None
    active: Optional[bool] = None
    admin: Optional[bool] = None


class JwtErrorModel(BaseModel):
    status: str
    msg: str
