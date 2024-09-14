import requests
from bs4 import BeautifulSoup

# website = 'https://kla.wd1.myworkdayjobs.com/en-US/Search/job/Milpitas-CA/Software-Engineer--New-College-Grad-_2425130-1?utm_source=Simplify&ref=Simplify'
website = 'https://jobs.ashbyhq.com/Jerry/01a0c07a-ebc9-4bfb-a99d-21eafaf9be38?utm_source=Simplify&ref=Simplify'
result = requests.get(website)
content = result.text

soup = BeautifulSoup(content, 'lxml')
# job_description = soup.find(id='jobPostingDescription')

print(soup.prettify())