import requests
import os
from dotenv import load_dotenv

load_dotenv()

def get_youtube_resources(tech):
    search_url = "https://www.googleapis.com/youtube/v3/search"
    params = {
        "part": "snippet",
        "q": f"react.js tutorial",
        "key": os.getenv("YOUTUBE_API_KEY"),
        "type": "video",
        "maxResults": 2
    }
    response = requests.get(search_url, params=params)
    videos = response.json().get('items', [])
    resources = [{"name": video['snippet']['title'], "url": f"https://www.youtube.com/watch?v={video['id']['videoId']}"} for video in videos]
    return resources

print(get_youtube_resources("react"))