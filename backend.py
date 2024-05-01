from fastapi import FastAPI, Request
from openai import OpenAI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import json
from datetime import datetime
import os


class Dolores():
    def __init__(self):
        self.OPENAI_API_KEY = "sk-proj-EI9DZONCHgrS7W5Flh2aT3BlbkFJLFLqN10iwIoEwv9R6YWh"
        self.OPENAI_ASSISTANT_ID = "asst_1l9QjbTLtJnMI3fEbZyf4Tc6"
        self.user_input = ''
        self.response = ''
        self.flag = True
        self.user = ''
        self.user_context = ''
        self.assistant_context = ''
        self.context = {
            "user": '',
            "assistant": ''
        }
        self.location = ''

    def assistant(self):        
        client = OpenAI(api_key=self.OPENAI_API_KEY)
        thread = client.beta.threads.create(
            messages=[
                {
                    "role": "user",
                    "content": f"This is the previous context:\n\nuser:{self.context['user']}\nassistant:{self.context['assistant']}. And this is the current prompt: {self.user_input}. Respond in plain string format, no special formatting",
                }
            ]
        )

        run = client.beta.threads.runs.create(
            thread_id = thread.id,
            assistant_id = self.OPENAI_ASSISTANT_ID
        )
        while run.status != "completed":
            print(run.status)
            run = client.beta.threads.runs.retrieve(
                thread_id=thread.id,
                run_id=run.id
            )
        messages = client.beta.threads.messages.list(
            thread_id=thread.id
        )
        return messages.data[0].content[0].text.value
    
    def generateContext(self, input, role):
        summarizing_client = OpenAI(api_key=self.OPENAI_API_KEY)
        response = summarizing_client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {
                    "role":"system",
                    "content": f"You'll be given a transcript of one of the person in the chat. this transcript is from the {role}. The transcript will have 2 paragraphs, first paragraph will have all the summarized info from previous message sent by the {role} and current message sent by the {role}. You have to summarize both these messages and create a paragraph that will have all the important information from the transcripts. Return summary in this format: 'Previous Context: [summary]'"
                },
                {
                    "role":"user",
                    "content": f"{input}"
                }
            ],
            temperature=0.7,
            top_p=1
        )
        return response.choices[0].message.content
    
    def openJSON(self, user):        
        self.user = str(user)
        if not os.path.isdir(f"./context/{user}"):
            os.makedirs(f"./context/{user}")
        self.location = f"./context/{user}/{datetime.today().strftime('%Y%m%d')}.json"
        try:
            with open(self.location, 'r') as cFile:
                self.context=json.load(cFile)
        except:
            pass
    
    def saveJSON(self):
        with open(self.location, 'w') as cFile:
            json.dump(self.context, cFile)
    
    def chat(self, user_input, user):
        self.user_input = user_input
        self.openJSON(user)
        self.response = self.assistant().replace("\n", "<br>")
        user_context = self.generateContext(f"{self.context['user']}\n\n{self.user_input}", "user")
        assistant_context = self.generateContext(f"{self.context['assistant']}\n\n{self.response}", "assistant")
        self.context['user'] = user_context
        self.context['assistant'] = assistant_context
        self.saveJSON()
        return self.response

app = FastAPI()
origins = [
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

bot_responses = Dolores()
# print(f'''Assistant: {bot_responses.chat(f"{input('You: ')}", "rajanpande")}''')

@app.post("/get_response/")
async def get_bot_response(request: Request):
    data = await request.json()
    user_message = data["user_message"]
    user = data["user"]
    bot_response = bot_responses.chat(user_message, user)
    print(bot_response)
    return {"bot_response": bot_response}

if __name__ == "__main__":
    uvicorn.run("backend:app", reload=True)
