import requests
from bs4 import BeautifulSoup

# Load the HTML content
html_content = '''
<!DOCTYPE html>
<html lang="en">
<head>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
        href="https://fonts.googleapis.com/css2?family=Abril+Fatface&family=Averia+Serif+Libre:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&family=Birthstone+Bounce:wght@400;500&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Passion+One:wght@400;700;900&display=swap"
        rel="stylesheet"
    />
    <link href="https://fonts.googleapis.com/css2?family=Cantarell:ital,wght@0,400;0,700;1,400;1,700&family=Carattere&family=Catamaran:wght@100..900&family=Inclusive+Sans:ital@0;1&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="/public/styles/landing.css" />
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Eventia - Landing Page</title>
</head>
<body>
    <div class="main-01">python
        <div class="icon-bar">
            <h2>EVENTIA</h2>
            <p>We create great memories</p>
        </div>
        <div class="nav-bar">
            <ul>
                <li id="li01"><a href="#">Home</a></li>
                <li id="li02"><a href="#">Events</a></li>
                <li id="li03"><a href="#">My Events</a></li>
                <li id="li04"><a href="#">Contact Us</a></li>
                <li><a href="Login.html"><button><h4>GET STARTED</h4></button></a></li>
            </ul>
        </div>
        <div class="main-01-a">
            <h1>Simplify your Event <br />Planning <br />with us</h1>
            <p>A great plan and a great arrangement lead to a <br />mesmerizing and memorable experience. Come join <br />us and make your event unforgettable.</p>
        </div>

        <div class="main-01-b">
            <video autoplay loop muted src="banner-intro.webm"></video>
        </div>
    </div>

    <div class="main-02">
        <p>Unleash your creativity while we handle the details, ensuring every moment shines. <br />From intimate gatherings to grand celebrations, we tailor each event to perfection.</p>
    </div>

    <!-- Other content omitted for brevity -->
</body>
</html>
'''

# Parse the HTML with BeautifulSoup
soup = BeautifulSoup(html_content, 'html.parser')

# Example: Extracting key data from the HTML

# Extract the title of the page
page_title = soup.title.string
print("Page Title:", page_title)

# Extract the heading (Eventia)
heading = soup.find('h2').get_text()
print("Heading:", heading)

# Extract navigation bar items (Home, Events, etc.)
nav_items = soup.find_all('li')
print("Navigation Items:")
for item in nav_items:
    print(item.get_text())

# Extract the first paragraph under the first section
first_section_paragraph = soup.find('div', class_='main-01-a').find('p').get_text()
print("First Section Paragraph:", first_section_paragraph)

# Extract all video sources
video_sources = soup.find_all('video')
for video in video_sources:
    video_src = video.get('src')
    print("Video Source:", video_src)