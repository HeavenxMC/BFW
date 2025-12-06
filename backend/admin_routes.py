from fastapi import APIRouter, HTTPException, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel
from typing import Any, Dict
import json
import os
from pathlib import Path

admin_router = APIRouter(prefix="/api/admin", tags=["admin"])
security = HTTPBearer()

# Simple admin password (change this!)
ADMIN_PASSWORD = os.environ.get('ADMIN_PASSWORD', 'blackfeather2024')

class LoginRequest(BaseModel):
    password: str

class ConfigUpdateRequest(BaseModel):
    config: Dict[str, Any]

def verify_admin(credentials: HTTPAuthorizationCredentials = Depends(security)):
    if credentials.credentials != ADMIN_PASSWORD:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    return True

@admin_router.post("/login")
async def admin_login(request: LoginRequest):
    if request.password == ADMIN_PASSWORD:
        return {
            "success": True,
            "token": ADMIN_PASSWORD,
            "message": "Login successful"
        }
    raise HTTPException(status_code=401, detail="Invalid password")

@admin_router.get("/config")
async def get_config(verified: bool = Depends(verify_admin)):
    config_path = Path("/app/frontend/src/config.js")
    try:
        content = config_path.read_text()
        # Extract the config object from the JS file
        start = content.find("export const siteConfig = ")
        if start == -1:
            raise HTTPException(status_code=500, detail="Config format error")
        
        config_str = content[start + len("export const siteConfig = "):]
        # Find the closing of the object
        end = config_str.rfind(";");
        if end != -1:
            config_str = config_str[:end]
        
        return {"success": True, "config": config_str}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error reading config: {str(e)}")

@admin_router.post("/config")
async def update_config(request: ConfigUpdateRequest, verified: bool = Depends(verify_admin)):
    config_path = Path("/app/frontend/src/config.js")
    try:
        # Convert the config dict to a formatted JS object string
        config_json = json.dumps(request.config, indent=2)
        
        # Create the JS file content
        js_content = f"""// BLACK FEATHER GANG - ADMIN CONFIGURATION FILE
// Edit this file to control all website content, colors, images, and settings

export const siteConfig = {config_json};
"""
        
        # Write the file
        config_path.write_text(js_content)
        
        return {"success": True, "message": "Configuration updated successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error updating config: {str(e)}")
