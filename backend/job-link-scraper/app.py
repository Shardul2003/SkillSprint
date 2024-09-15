from flask import Flask, jsonify, request
from flask_cors import CORS
import openai
import requests
from bs4 import BeautifulSoup
import os
from dotenv import load_dotenv

app = Flask(__name__)

# Ensure CORS is configured correctly
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}}, supports_credentials=True)

def scraper(link):
    result = requests.get(link)
    content = result.text

    soup = BeautifulSoup(content, 'lxml')

    file_name = 'job_description.txt'
    with open(file_name, 'w') as file:
        file.write(soup.prettify())


@app.route('/api/gptresult', methods=['GET'])
def gptresult():

    print("Request", request)
    input_data = request.args.get('input')
    print("Input data:", input_data)

    load_dotenv()

    openai.api_key = os.getenv("OPENAI_API_KEY")

    input_data = request.args.get('input')  # Get the input data from query parameters
    # return {"message" : input_data}
    if not input_data:
        return jsonify({'message': input_data}), 400

    print("backend request: ", request)
    print("Input received: ", input_data)

    # Here you would call your scraper function with input_data
    scraper(input_data)  # Assuming scraper function processes the URL

    with open('job_description.txt', 'r') as file:
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

    res = response.choices[0].message.content
    return jsonify({'message': res})  # Ensure response is JSON

if __name__ == '__main__':
    app.run(port=5000)
