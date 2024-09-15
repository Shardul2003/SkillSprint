from flask import Flask, jsonify, request
from flask_cors import CORS
import openai
import requests
from bs4 import BeautifulSoup
import os
from dotenv import load_dotenv
import re
import json

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

    prompt = os.getenv("OPENAI_PROMPT")
    # Azure OpenAI GPT API call
    response = openai.chat.completions.create(
        model="gpt-4o-mini",  # Replace this with your Azure OpenAI deployment name
        messages=[
            {"role": "system", "content": "You are an expert in analyzing job descriptions."},
            {"role": "user", "content": f"{prompt} {job_description}"}
        ],
    )

    res = response.choices[0].message.content

    # Split the input text into sections based on the numbering
    sections = re.split(r'(\d+\.)', res)

    data = {}

    # Iterate over the sections to extract titles and technologies
    for i in range(1, len(sections), 2):
        # sections[i] is the numbering like '1.', '2.', etc.
        # sections[i+1] is the content following the numbering
        content = sections[i+1].strip()
        print("SECTION CONTENT: ", content, "\n")

        title_pattern = r"\*\*(.*?)\*\*"
        title_match = re.search(title_pattern, content)
        
        if title_match:
            title = title_match.group(1).strip()
            # Find the position where the title ends
            end_of_title = title_match.end()
            # Extract the remaining text after the title
            remaining_text = content[end_of_title:].strip(' -')
            if remaining_text:
                # Split the remaining text by ' - ' to get the list of technologies
                technologies = [tech.strip() for tech in remaining_text.split(' - ')]
            else:
                technologies = []
        else:
            title = ''
            technologies = []

        # title = title[:-1]
        technologies.pop(0)

        final_technologies = []
        for tech in technologies:
            supplementary = get_youtube_resources(tech)  # Get the supplementary materials for each technology
            final_technologies.append({"technology": tech, "supplementary": supplementary})


        new_item = {
            'title' : title,
            'technologies' : final_technologies,
        }

        id = i
        data[id] = new_item


    # Convert the list to JSON format
    # json_output = json.dumps(data, indent=2)
    print("JSON OUTPUT ", data)
    # return data
    return jsonify({'message' : data})


def get_youtube_resources(tech):
    search_url = "https://www.googleapis.com/youtube/v3/search"
    params = {
        "part": "snippet",
        "q": f"{tech} tutorial",
        "key": os.getenv("YOUTUBE_API_KEY"),
        "type": "video",
        "maxResults": 2
    }
    response = requests.get(search_url, params=params)
    videos = response.json().get('items', [])
    resources = [{"name": video['snippet']['title'], "url": f"https://www.youtube.com/watch?v={video['id']['videoId']}"} for video in videos]
    return resources



if __name__ == '__main__':
    app.run(port=5000)
