import requests
from bs4 import BeautifulSoup

# Test site
website = 'https://jobs.ashbyhq.com/Jerry/01a0c07a-ebc9-4bfb-a99d-21eafaf9be38?utm_source=Simplify&ref=Simplify'
result = requests.get(website)
content = result.text

soup = BeautifulSoup(content, 'lxml')

print(soup.prettify())