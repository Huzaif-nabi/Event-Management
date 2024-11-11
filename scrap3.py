import requests
import csv

# Define the URL of your events endpoint
url = "http://localhost:3000/events"

# Send a GET request to fetch the event data
response = requests.get(url)

# Check if the response is successful
if response.status_code == 200:
    events = response.json()  # Parse the JSON response into a Python list
    
    # Define the CSV file path where you want to save the data
    csv_file = "events.csv"
    
    # Open the CSV file in write mode
    with open(csv_file, mode="w", newline="") as file:
        writer = csv.writer(file)
        
        # Write the header row (keys of the first event object)
        if events:
            headers = events[0].keys()
            writer.writerow(headers)  # Write header
        
            # Write the event data rows
            for event in events:
                writer.writerow(event.values())
    
    print(f"Data successfully written to {csv_file}")
else:
    print(f"Failed to fetch events. HTTP Status Code: {response.status_code}")
