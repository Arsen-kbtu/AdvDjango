from fastapi import FastAPI, Depends, Request, Form, status

from starlette.responses import RedirectResponse
from starlette.templating import Jinja2Templates

templates = Jinja2Templates(directory="templates")
app = FastAPI()

@app.get("/")
def home():
    return {"Hello" : "World"}

@app.get("/items/{item_id}")
def read_item (item_id: int):
    return {"item_id": item_id}