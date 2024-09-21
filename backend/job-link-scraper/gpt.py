import openai
import os
from dotenv import load_dotenv

load_dotenv()

openai.api_key = os.getenv("OPENAI_API_KEY")

# Load the file content
with open('job_posting.txt', 'r') as file:
    job_description = file.read()

prompt = os.getenv("OPENAI_PROMPT")
response = openai.chat.completions.create(
    model="gpt-4o-mini",
    messages=[
        {"role": "system", "content": "You are an expert in analyzing job descriptions."},
        {"role": "user", "content": f"{prompt} {job_description}"}
    ],
)

content = response.choices[0].message.content
print(content)
