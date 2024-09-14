import openai
import os
from dotenv import load_dotenv
import json

load_dotenv()

openai.api_key = os.getenv("OPENAI_API_KEY")

# Load the file content
with open('job_posting.txt', 'r') as file:
    job_description = file.read()

prompt = "This is data from a job application. Group the tech stack required and expected of this job into 5 technical categories. Make sure there is no repeating items in the categories, meaning that each category should be unique from another. Just name the tools and technologies, do not give explanations for each. Avoid giving a summary of the job posting or details about the posting other than qualifications/skills required for the job. "
# Azure OpenAI GPT API call
response = openai.chat.completions.create(
    model="gpt-4o-mini",  # Replace this with your Azure OpenAI deployment name
    messages=[
        {"role": "system", "content": "You are an expert in analyzing job descriptions."},
        {"role": "user", "content": f"{prompt} {job_description}"}
    ],
)

# Extract and print the AI's response
# print(response['choices'][0]['message']['content'])
content = response.choices[0].message.content
print(content)
