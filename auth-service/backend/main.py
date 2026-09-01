import os
from dotenv import load_dotenv
from fastapi import FastAPI, Header, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from supabase import create_client

load_dotenv()

supabase = create_client(
    os.environ["SUPABASE_URL"],
    os.environ["SUPABASE_SERVICE_ROLE_KEY"]
)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {"message": "Auth service is running"}


@app.post("/auth/sync-user")
def sync_user(authorization: str = Header(...)):
    if not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Invalid authorization")

    token = authorization.replace("Bearer ", "")

    try:
        response = supabase.auth.get_user(token)
        user = response.user
    except Exception:
        raise HTTPException(status_code=401, detail="Invalid token")

    metadata = user.user_metadata or {}

    profile = {
        "id": str(user.id),
        "email": user.email,
        "full_name": metadata.get("full_name") or metadata.get("name"),
        "avatar_url": metadata.get("avatar_url") or metadata.get("picture"),
    }

    result = supabase.table("profiles").upsert(profile).execute()

    return {
        "success": True,
        "profile": result.data[0]
    }
