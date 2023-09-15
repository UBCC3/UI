from fastapi import APIRouter, Depends, FastAPI, Response, status, Body, HTTPException
from fastapi.security import HTTPBearer
from ..database.calculation_management import (
    get_all_available_basis_sets,
    get_all_available_calculations,
    get_all_available_methods,
)

from ..models import (
    AvailableBasisSetsModel,
    AvailableCalculationsModel,
    AvailableMethodsModel,
    JwtErrorModel,
)
from ..util import VerifyToken, token_auth
from typing import Union

router = APIRouter(
    prefix="/calculations",
    tags=["calculations"],
    responses={404: {"description": "Not found"}},
)

token_auth_schema = HTTPBearer()


@router.get(
    "/get-available-calculations",
    response_model=Union[list[AvailableCalculationsModel], JwtErrorModel],
)
async def get_available_calculations(
    response: Response, token: str = Depends(token_auth)
):
    return get_all_available_calculations()


@router.get(
    "/get-available-basis-sets",
    response_model=Union[list[AvailableBasisSetsModel], JwtErrorModel],
)
async def get_available_basis_sets(
    response: Response, token: str = Depends(token_auth)
):
    return get_all_available_basis_sets()


@router.get(
    "/get-available-methods",
    response_model=Union[list[AvailableMethodsModel], JwtErrorModel],
)
async def get_available_methods(response: Response, token: str = Depends(token_auth)):
    return get_all_available_methods()
