from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import uvicorn
from todo import todo_router  # 방명록 라우터를 임포트

app = FastAPI()

origins = ["http://127.0.0.1:5500", "http://34.232.128.18"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def welcome() -> dict:
    return {
        "msg": "hello world?"
    }

# 방명록 라우터를 포함
app.include_router(todo_router)

# 정적 파일 제공
app.mount("/static", StaticFiles(directory="../yunseon's homepage template"), name="static")

if __name__ == '__main__':
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
