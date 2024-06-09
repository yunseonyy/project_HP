from fastapi import APIRouter, Path
from pydantic import BaseModel
from typing import List
from datetime import datetime

class GuestbookEntry(BaseModel):
    id: int
    author: str
    content: str
    created_at: str

todo_router = APIRouter()

guestbook_list = []
guestbook_counter = 0

@todo_router.post("/guestbook", response_model=GuestbookEntry)
async def add_guestbook(entry: GuestbookEntry) -> dict:
    global guestbook_counter
    entry.id = guestbook_counter = guestbook_counter + 1
    entry.created_at = datetime.now().isoformat()
    guestbook_list.append(entry)
    return entry

@todo_router.get("/guestbook", response_model=List[GuestbookEntry])
async def retrieve_guestbooks() -> List[GuestbookEntry]:
    return guestbook_list

@todo_router.get("/guestbook/{entry_id}", response_model=GuestbookEntry)
async def get_single_guestbook(entry_id: int = Path(..., title="ID")) -> dict:
    for entry in guestbook_list:
        if entry.id == entry_id:
            return entry
    raise HTTPException(status_code=404, detail="Guestbook entry with supplied ID doesn't exist")

@todo_router.delete("/guestbook/{entry_id}")
async def delete_guestbook(entry_id: int = Path(..., title="the ID of the guestbook entry to delete")) -> dict:
    global guestbook_list
    guestbook_list = [entry for entry in guestbook_list if entry.id != entry_id]
    return {"message": f"Guestbook entry with ID {entry_id} deleted successfully"}
