
# Event Registration Project

This project is an event registration system built using Node.js and Express, with EJS for templating. Users can register for events, view participants, and administrators can manage events (add, edit, delete).

## Installation

Install eventejs with npm

```bash
git clone https://github.com/DerpNerdd/eventsejs.git
cd eventsejs

npm install
node app.js
```

Then navigate to http://localhost:5100

    
## Example

Once the server is running, you can navigate through the following features:

- Home Page: Navigate to the two other pages.
- Events Page: Browse upcoming events and register for them via the form.
- Participants Page: View the participants for any event.
- Admin Page: Add, edit, or delete events in their respective boxes.
## Documentation

- Home Page:

    - Endpoint: **/**
    - Method: **GET**
    - Description: **Displays the homepage of the event registration system.**

- List Events:

    - Endpoint: **/events**
    - Method: **GET**
    - Description: **Retrieves and displays a list of upcoming events.**

- Register for an Event:

    - Endpoint: **/register**
    - Method: **POST**
    - Description: **Allows a user to register for an event.**
    - Parameters:
        - name (string): **User's name.**
        - email (string): **User's email.**
        - event (string): **The name of the event.**
        - Response: **Redirects to the /events page after successful registration.**

- View Participants:

    - Endpoint: **/participants/:eventName**
    - Method: **GET**
    - Description: **Displays participants who have registered for a given event.**
    - Parameters:
        - eventName (string): **The name of the event.**
- Admin - Add Event:

    - Endpoint: **/admin/add**
    - Method: **POST**
    - Description: **Allows the admin to add a new event.**
    - Parameters:
        - name (string): **Event name.**
        - date (string): **Event date.**
        - description (string): **Event description.**
    - Response: **Redirects to the /admin page after successfully adding an event.**
- Admin - Edit Event:

    - Endpoint: **/events/:id**
    - Method: **POST**
    - Description: **Allows the admin to edit an existing event.**
    - Parameters:
        - id (number): **Event ID.**
        - name, date, description: **Updated event data.**
    - Response: **Redirects to the /admin page after successfully editing an event.**
- Admin - Delete Event:

    - Endpoint: **/events/:id/delete**
    - Method: **POST**
    - Description: **Allows the admin to delete an event.**
    - Parameters:
        - id (number): **Event ID.**
    - Response: **Redirects to the /admin page after successful deletion.**


## Example Usage

1. **Registering for an Event**

- The /register route allows users to register for an event. The registration process involves submitting a form with the user's name, email, and the selected event.

- Route Information:
    - Endpoint: /register
    - Method: POST
    - Parameters:
        - name: The user's name.
        - email: The user's email address.
        - event: The name of the event the user is registering for.
**Example Request:**

HTML Form Example (from events.ejs):

html
```bash
<form action="/register" method="POST">
  <label>Name:</label>
  <input type="text" name="name" required><br>
  
  <label>Email:</label>
  <input type="email" name="email" required><br>
  
  <label>Select Event:</label>
  <select name="event" required>
    <% events.forEach(event => { %>
      <option value="<%= event.name %>"><%= event.name %></option>
    <% }); %>
  </select><br>
  
  <button type="submit">Register</button>
</form>
```
Example Request Payload:

json
```bash
{
  "name": "John Doe",
  "email": "john@example.com",
  "event": "Science Fair"
}
Example Server Code (from app.js):
javascript
Copy code
app.post('/register', (req, res) => {
    const { name, email, event } = req.body;
    const registrations = readRegistrations();
    
    if (!registrations[event]) {
        registrations[event] = [];
    }

    registrations[event].push({ name, email });
    writeRegistrations(registrations);

    res.redirect('/events');
});
```
After submission, the user is redirected to the /events page, where they can see their registration.

2. **Viewing Participants for an Event**

- The /participants/:eventName route allows users to view all participants registered for a specific event.

- Route Information
    - Endpoint: /participants/:eventName
    - Method: GET
    - Parameters:
        - eventName: The name of the event.
**Example Request**

Example URL:

```bash

/participants/Science Fair
Server-Side Example:

javascript
Copy code
app.get('/participants/:eventName', (req, res) => {
    const { eventName } = req.params;
    const registrations = readRegistrations();
    
    const participants = registrations[eventName] || [];
    res.render('participants', { eventName, participants });
});
Example Rendering in participants.ejs:
```
html
```bash
<div class="participants-container">
    <h1>Participants for <%= eventName %></h1>
    <p>Attendees: <%= participants.length %></p>
    
    <ul class="participants-list">
        <% participants.forEach(participant => { %>
            <li>
                <strong>Name:</strong> <%= participant.name %><br>
                <strong>Email:</strong> <%= participant.email %>
            </li>
        <% }); %>
    </ul>
    
    <a href="/events" class="back-button">Back to Events</a>
</div>
```
Example Response:

html
```bash
<h1>Participants for Science Fair</h1>
<p>Attendees: 3</p>
<ul>
  <li><strong>Name:</strong> John Doe<br><strong>Email:</strong> john@example.com</li>
  <li><strong>Name:</strong> Jane Smith<br><strong>Email:</strong> jane@example.com</li>
  <li><strong>Name:</strong> Bob Johnson<br><strong>Email:</strong> bob@example.com</li>
</ul>
```
3. **Admin Adding a New Event**

- The /admin/add route allows admins to add new events.

- Route Information
    - Endpoint: /admin/add
    - Method: POST
    - Parameters:
        - name: The name of the event.
        - date: The date of the event.
        - description: A brief description of the event.

**Example Request**

HTML Form Example (from admin.ejs):

html
```bash
<form action="/admin/add" method="POST">
  <label for="name">Event Name:</label>
  <input type="text" name="name" required><br>

  <label for="date">Event Date:</label>
  <input type="date" name="date" required><br>

  <label for="description">Event Description:</label>
  <textarea name="description" rows="4" required></textarea><br>

  <button type="submit">Add Event</button>
</form>
```
Example Request Payload:

json
```bash
{
  "name": "Spring Gala",
  "date": "2024-05-10",
  "description": "A celebration to mark the end of spring."
}
```
Example Server Code:

javascript
```bash
app.post('/admin/add', (req, res) => {
    const events = readEvents();
    const { name, date, description } = req.body;
    
    const newEvent = {
        id: events.length + 1,
        name,
        date,
        description
    };

    events.push(newEvent);
    writeEvents(events);
    res.redirect('/admin');
});
```
After submission, the new event will be added to the event list, and the admin will be redirected to the admin page to manage it.

4. **Admin Editing an Event**
- The /events/:id route allows admins to update an existing event.

- Route Information
    - Endpoint: /events/:id
    - Method: POST
    - Parameters:
        - id: The ID of the event being edited.
        - name, date, description: Updated event information.

**Example Request**

HTML Form Example (from admin.ejs):

html
```bash
<form action="/events/<%= event.id %>" method="POST">
  <label for="name">Event Name:</label>
  <input type="text" name="name" value="<%= event.name %>" required><br>

  <label for="date">Event Date:</label>
  <input type="date" name="date" value="<%= event.date %>" required><br>

  <label for="description">Event Description:</label>
  <textarea name="description" rows="4" required><%= event.description %></textarea><br>

  <button type="submit">Update Event</button>
</form>
```
Example Request Payload:

json
```bash
{
  "name": "Updated Science Fair",
  "date": "2024-11-02",
  "description": "A fun science fair with more events!"
}
```

Example Server Code:
javascript
```bash
app.post('/events/:id', (req, res) => {
    const events = readEvents();
    const { name, date, description } = req.body;
    const { id } = req.params;
    
    const eventIndex = events.findIndex(e => e.id == id);
    
    if (eventIndex >= 0) {
        events[eventIndex] = { id, name, date, description };
        writeEvents(events);
    }

    res.redirect('/admin');
});
```
After submission, the event is updated and the admin is redirected to the admin page.

5. **Admin Deleting an Event**
- The /events/:id/delete route allows admins to delete an event.

- Route Information
    - Endpoint: /events/:id/delete
    - Method: POST
    - Parameters:
        - id: The ID of the event being deleted.

**Example Request**

HTML Form Example (from admin.ejs):

html:
```bash
Copy code
<form action="/events/<%= event.id %>/delete" method="POST">
  <button type="submit">Delete</button>
</form>
Example Server Code:
javascript
Copy code
app.post('/events/:id/delete', (req, res) => {
    let events = readEvents();
    const { id } = req.params;
    
    events = events.filter(e => e.id != id);
    writeEvents(events);

    res.redirect('/admin');
});
```
After deletion, the admin is redirected to the admin page, and the event is removed from the list.
## Authors

- [@DerpNerdd](https://www.github.com/derpnerdd)


## License

**This project uses the GPL-3.0 License**

[GPL 3.0 License](https://www.gnu.org/licenses/gpl-3.0.en.html#license-text)


## Contributions

**2024-09-16T15:20:25.000Z**
- Main basis for the website was created, simple js and ejs code with 0 styling to get all the backend to work

**2024-09-17T15:20:25.000Z**
- Adding styling to all the ejs pages, very simple styling though. Had to redo app.js and many ejs files to fix bugs.

**2024-09-18T15:20:25.000Z**
- Finalized all styling to make it more advanced, fix all bugs, got webpage running with no errors and full functionality

**2024-09-25T15:20:25.000Z**
- Added new documentation to associate with the project
