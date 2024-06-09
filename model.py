from pydantic import BaseModel

class Todo(BaseModel):
    id: int
    author: str
    content: str
    created_at: str