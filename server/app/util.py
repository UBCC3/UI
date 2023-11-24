import os
import jwt
from dotenv import load_dotenv
from fastapi import Depends, status, HTTPException, File
from fastapi.security import HTTPBearer
import boto3
from botocore.exceptions import ClientError
import logging
from uuid import UUID


def set_up():
    """Sets up configuration for the app"""
    load_dotenv()

    config = {
        "DOMAIN": os.getenv("DOMAIN", "your.domain.com"),
        "API_AUDIENCE": os.getenv("API_AUDIENCE", "your.audience.com"),
        "ISSUER": os.getenv("ISSUER", "https://your.domain.com/"),
        "ALGORITHMS": os.getenv("ALGORITHMS", "RS256"),
    }

    return config


token_auth_schema = HTTPBearer()


def token_auth(token: str = Depends(token_auth_schema)):
    result = VerifyToken(token.credentials).verify()
    if result.get("status"):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=result)


class VerifyToken:
    """Does all the token verification using PyJWT"""

    def __init__(self, token, permissions=None, scopes=None):
        self.token = token
        self.permissions = permissions
        self.scopes = scopes
        self.config = set_up()

        # This gets the JWKS from a given URL and does processing so you can use any of
        # the keys available
        jwks_url = f'https://{self.config["DOMAIN"]}/.well-known/jwks.json'
        self.jwks_client = jwt.PyJWKClient(jwks_url)

    def verify(self):
        # This gets the 'kid' from the passed token
        try:
            self.signing_key = self.jwks_client.get_signing_key_from_jwt(self.token).key
        except jwt.exceptions.PyJWKClientError as error:
            return {"status": "error", "msg": error.__str__()}
        except jwt.exceptions.DecodeError as error:
            return {"status": "error", "msg": error.__str__()}

        try:
            payload = jwt.decode(
                self.token,
                self.signing_key,
                algorithms=self.config["ALGORITHMS"],
                audience=self.config["API_AUDIENCE"],
                issuer=self.config["ISSUER"],
            )
        except Exception as e:
            return {"status": "error", "message": str(e)}

        if self.scopes:
            result = self._check_claims(payload, "scope", str, self.scopes.split(" "))
            if result.get("error"):
                return result

        if self.permissions:
            result = self._check_claims(payload, "permissions", list, self.permissions)
            if result.get("error"):
                return result

        return payload

    def _check_claims(self, payload, claim_name, claim_type, expected_value):
        instance_check = isinstance(payload[claim_name], claim_type)
        result = {"status": "success", "status_code": 200}

        payload_claim = payload[claim_name]

        if claim_name not in payload or not instance_check:
            result["status"] = "error"
            result["status_code"] = 400

            result["code"] = f"missing_{claim_name}"
            result["msg"] = f"No claim '{claim_name}' found in token."
            return result

        if claim_name == "scope":
            payload_claim = payload[claim_name].split(" ")

        for value in expected_value:
            if value not in payload_claim:
                result["status"] = "error"
                result["status_code"] = 403

                result["code"] = f"insufficient_{claim_name}"
                result["msg"] = (
                    f"Insufficient {claim_name} ({value}). You don't have "
                    "access to this resource"
                )
                return result
        return result


def upload_to_s3(file: File, structure_id: UUID):
    s3 = boto3.client("s3")
    # TODO: update to actual bucketname
    bucket_name = "alexy-devel"
    try:
        response = s3.upload_fileobj(
            file.file, bucket_name, str(structure_id) + "/" + file.filename
        )
    except ClientError as e:
        logging.error(e)
        return False

# NOTE: route for downloading disabled for no
def download_from_s3(file_name: str, job_id: UUID):
    s3 = boto3.client("s3")
    # TODO: replace bucket name with actual bucket
    bucket_name = "alexy-devel"
    file_key = str(job_id) + "/" + file_name
    try:
        response = s3.generate_presigned_url(
            "get_object",
            Params={"Bucket": bucket_name, "Key": file_key},
            ExpiresIn=60,  # One minute, should be enough time to download file?
        )
        return response
    except Exception as e:
        raise HTTPException(status_code=404, detail=str(e))


# NOTE: route for reading file disabled for now
def read_from_s3(file_name: str, structure_id: UUID):
    s3 = boto3.client("s3")
    # TODO: replace bucket name with actual bucket
    bucket_name = "alexy-devel"
    file_key = structure_id + "/" + file_name
    try:
        response = s3.get_object(Bucket=bucket_name, Key=file_key)
        bytes = response["Body"].read()
        # pythonObject = json.loads(obj['Body'].read().decode('utf-8'))
        return bytes
    except Exception as e:
        raise HTTPException(status_code=404, detail=str(e))


def item_to_dict(item):
    return {c.name: getattr(item, c.name) for c in item.__table__.columns}
