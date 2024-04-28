from fastapi import FastAPI, Request
from openai import OpenAI
from fastapi.middleware.cors import CORSMiddleware
import re
import random
import time

class Dolores():
    def __init__(self):
        self.OPENAI_API_KEY = "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"
        self.OPENAI_ASSISTANT_ID = "asst_1l9QjbTLtJnMI3fEbZyf4Tc6"
        self.user_input = ''
        self.flag = True
    def assistant(self):        
        client = OpenAI(api_key=self.OPENAI_API_KEY)
        thread = client.beta.threads.create(
            messages=[
                {
                    "role": "user",
                    "content": f"{self.user_input}. Respond in plain string format, no special formatting",
                }
            ]
        )    
        run = client.beta.threads.runs.create(
            thread_id = thread.id,
            assistant_id = self.OPENAI_ASSISTANT_ID
        )
        while run.status != "completed":
            run = client.beta.threads.runs.retrieve(
                thread_id=thread.id,
                run_id=run.id
            )
        messages = client.beta.threads.messages.list(
            thread_id=thread.id
        )
        return messages.data[0].content[0].text.value
    
    def chat(self, user_input):
        self.user_input = user_input
        response = self.assistant().replace("\n", "<br>")
        return response

app = FastAPI()
origins = [
    "http://127.0.0.1:5500",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

bot_responses = Dolores()

@app.post("/get_response/")
async def get_bot_response(request: Request):
    data = await request.json()
    user_message = data["user_message"]
    bot_response = bot_responses.chat(user_message)
    return {"bot_response": bot_response}

