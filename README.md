# SkillSprint

Enter a link for a technical job posting to get your very own personalized study guide, designed to help you prepare for the job and its interviews!

The user can paste the link of a job description into the input, and it will return several cards separated by categories that give an overview of the tech stack necessary to qualify and succeed in the role. Each technology will also include a few study materials, which include links to Youtube videos and such.

Checkout the Demo for this app here!
[SkillSprint Demo](https://www.youtube.com/watch?v=WtHG8y8H7kk)

You can also visit the DevPost for more information!
[SkillSprint DevPost](https://devpost.com/software/skillsprint)

# How It Works

The backend of our application was built using **Flask** as our backend framework, **Beautiful Soup** for web scraping, and **OpenAI API** for categorizing. Once the link was received, the web scraper will scrape the contents of the job posting and produce a job description in the HTML format expected. From there, we connect to **GPT API** to pass in the HTML-formatted description, prompting it to break the skills, qualifications, and/or responsibilities sections into their respective categories. From there, we isolate the key terms of the tech stack, and use the **YouTube Data API** to display the video guides. Using some fun tricks in **Python**, we convert this response into the proper JSON format we want, and send this to our frontend! 

We built our frontend using **Next.js** and **Tailwind CSS**. We have Next.js handle the input field and fetch the api response, then process it. The **HTML iFrame** is used to embed the videos into the application, so they can be interacted with on the platform itself. We used Tailwind to make give our application a modern, and hopefully beautiful, **UI/UX**.

# Inspiration

In the past year with all the tech layoffs happening, many students have been struggling to find jobs in the tech industry. With lower hiring quotas, interviews become more difficult to attain and interview cycles also tend to be more rigorous and demanding. We personally know many affected by this, and wanted to come up with a tool that could help students and graduates be better equipped. As a result, we were inspired to build an application that provides in-depth information on the tech stack expected for the position and provide tools to prepare. This way, candidates get a better understanding of what to expect on the job, and also be better equipped to tackle those technical interviews!

# Future Improvements

The next steps for SkillSprint woould be to actually convert it into a chrome extension!

We realize that this tool would be easier for people to use if they could simply click a button and have it produce the necessary details they need.

Another step is to create user profiles, where they can track the applications they have submitted, see which skills have the most overlap in applications, and personalize the study content they want to focus on.

Some super cool things we are excited to continue working on!

