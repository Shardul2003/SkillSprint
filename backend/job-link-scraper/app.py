from flask import Flask, jsonify, request
from flask_cors import CORS
import openai
import requests
from bs4 import BeautifulSoup
import os
from dotenv import load_dotenv

app = Flask(__name__)
CORS(app)

# # @app.route('/api/scraper', methods=['GET'])
# def scraper(link):
#     # Your function logic here
#     # website = 'https://jobs.ashbyhq.com/Jerry/01a0c07a-ebc9-4bfb-a99d-21eafaf9be38?utm_source=Simplify&ref=Simplify'
#     # website = user_input
#     result = requests.get(link)
#     content = result.text

#     soup = BeautifulSoup(content, 'lxml')

#     file_name = 'job_description.txt'
#     with open(file_name, 'w') as file:
#         file.write(soup.prettify())

#     # print(soup.prettify())
#     result = {"message": "scraper completed"}
#     # return result

# # @app.route('/api/gptresult', methods=['POST'])
# # def gpt_result():
# #     print(request)
# #     data = request
# #     load_dotenv()

# #     openai.api_key = os.getenv("OPENAI_API_KEY")
# #     scraper(data) # call scraper so it writes content to file

# #     # Load the file content
# #     with open('job_description.txt', 'r') as file:
# #         job_description = file.read()

# #     prompt = "This is data from a job application. Group the tech stack required and expected of this job into 5 technical categories. Make sure there is no repeating items in the categories, meaning that each category should be unique from another. Just name the tools and technologies, do not give explanations for each. Avoid giving a summary of the job posting or details about the posting other than qualifications/skills required for the job. "
# #     # Azure OpenAI GPT API call
# #     response = openai.chat.completions.create(
# #         model="gpt-4o-mini",  # Replace this with your Azure OpenAI deployment name
# #         messages=[
# #             {"role": "system", "content": "You are an expert in analyzing job descriptions."},
# #             {"role": "user", "content": f"{prompt} {job_description}"}
# #         ],
# #     )

# #     # Print the AI's response
# #     content = response.choices[0].message.content
# #     # print(content)

# #     # Your function logic here
# #     # result = {"message": "GPT API Executed", "data": data}
# #     return content

# @app.route('/api/gptresult', methods=['POST'])
# def gpt_result():
#     data = request.get_json()
#     load_dotenv()

#     openai.api_key = os.getenv("OPENAI_API_KEY")
#     scraper(data['input'])  # Access the URL from the JSON data

#     # Load the file content
#     with open('job_description.txt', 'r') as file:
#         job_description = file.read()

#     prompt = "This is data from a job application. Group the tech stack required and expected of this job into 5 technical categories. Make sure there is no repeating items in the categories, meaning that each category should be unique from another. Just name the tools and technologies, do not give explanations for each. Avoid giving a summary of the job posting or details about the posting other than qualifications/skills required for the job. "
#     # Azure OpenAI GPT API call
#     response = openai.chat.completions.create(
#         model="gpt-4o-mini",  # Replace this with your Azure OpenAI deployment name
#         messages=[
#             {"role": "system", "content": "You are an expert in analyzing job descriptions."},
#             {"role": "user", "content": f"{prompt} {job_description}"}
#         ],
#     )

#     content = response.choices[0].message.content
#     return jsonify(content)  # Wrap the content in jsonify to return JSON

def scraper(link):
    result = requests.get(link)
    content = result.text

    soup = BeautifulSoup(content, 'lxml')

    file_name = 'job_description.txt'
    with open(file_name, 'w') as file:
        file.write(soup.prettify())

@app.route('/api/gptresult', methods=['POST'])
def gptresult():
    print("backend request: ", request)
    data = request.get_json
    print(data['input'])
    load_dotenv()

    openai.api_key = os.getenv("OPENAI_API_KEY")
    # scraper(data['input'])  # Call scraper with the URL
    scraper(request)

    with open('job_description.txt', 'r') as file:
        job_description = file.read()

    prompt = "This is data from a job application. Group the tech stack required and expected of this job into 5 technical categories..."
    response = openai.chat.completions.create(
        model="gpt-4o-mini",  # Replace this with your Azure OpenAI deployment name
        messages=[
            {"role": "system", "content": "You are an expert in analyzing job descriptions."},
            {"role": "user", "content": f"{prompt} {job_description}"}
        ],
    )

    content = response.choices[0].message.content
    return jsonify({"message": content})  # Ensure response is JSON


if __name__ == '__main__':
    app.run(port=5000)
