# eventsejs
 
Objective:
Create a basic event registration system using Node.js, Express, and EJS. The event itself can be any school-appropriate event, real or fictional. The system should allow users to view upcoming events and register for them. An admin dashboard will allow event management (adding, editing, and deleting events). The system should read from and write to a .txt file for storing event data. Extra credit will be given for implementing the system with a .json file instead.

Requirements:
User Side (Frontend)
Display a list of upcoming events using EJS.
Provide a form for users to register for events (name, email, event selected).
Store the registration details in a .txt file (or .json file for extra credit).
Admin Side (Backend)
Create an admin dashboard to:
Add new events (Event name, date, description).
Edit existing events.
Delete events.
Read the event data from a .txt file (or .json for extra credit) and display it in the dashboard.
Store updated event information in the file.
Instructions:
Setup
Initialize your project folder using npm init and install the required packages: express, ejs, and fs (for file handling).

npm init -y

npm install express ejs fs

Project Structure:
Organize your project with the following structure:
bash

/event-registration

├── /views

│   ├── events.ejs

│   ├── admin.ejs

├── /public

│   └── style.css

├── /data

│   └── events.txt

├── app.js

└── package.json

Routes:
GET /events: Display the list of upcoming events to the user.
POST /register: Handle form submissions for event registrations. Save the registration details to the .txt file (or .json for extra credit).
GET /admin: Display the admin dashboard to view, add, edit, and delete events.
POST /admin/add: Handle adding a new event.
POST /admin/edit/:id: Handle editing an existing event.
POST /admin/delete/:id: Handle deleting an event.
File Handling:
Use the fs module in Node.js to read and write to the events.txt file.
The .txt file should store event data in a simple format like:

Event1|2024-10-15|Description of event 1

Event2|2024-11-01|Description of event 2

For extra credit, use a .json file to store events in the following format:

[

  {"name": "Event1", "date": "2024-10-15", "description": "Description of event 1"},

  {"name": "Event2", "date": "2024-11-01", "description": "Description of event 2"}

]

Frontend with EJS:
Use EJS to dynamically render the events on both the user-facing events page and the admin dashboard.
Create forms in EJS for users to register for events and for the admin to add/edit/delete events.
Styling:
Create a simple CSS file in the public folder to style the pages, especially the event list and admin dashboard.
Extra Credit:
Implement file handling using a .json file instead of a .txt file for both event data and registration details.
Deliverables:
The complete project code, including all routes and EJS templates.
A working event registration system where users can register for events and admins can manage events.
 
