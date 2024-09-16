const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 5100;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

const eventsFilePath = path.join(__dirname, 'data/events.json');
const registrationsFilePath = path.join(__dirname, 'data/registrations.json');

const readEvents = () => {
    const data = fs.readFileSync(eventsFilePath, 'utf8');
    return JSON.parse(data);
};

const writeEvents = (events) => {
    const data = JSON.stringify(events, null, 2);
    fs.writeFileSync(eventsFilePath, data);
};

const readRegistrations = () => {
    if (!fs.existsSync(registrationsFilePath)) return {};
    const data = fs.readFileSync(registrationsFilePath, 'utf8');
    return JSON.parse(data);
};

const writeRegistrations = (registrations) => {
    const data = JSON.stringify(registrations, null, 2);
    fs.writeFileSync(registrationsFilePath, data);
};

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/events', (req, res) => {
    const events = readEvents();
    res.render('events', { events });
});

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

app.get('/participants/:eventName', (req, res) => {
    const { eventName } = req.params;
    const events = readEvents();
    const registrations = readRegistrations();

    const event = events.find(e => e.name === eventName);
    const participants = registrations[eventName] || [];

    res.render('participants', { event, participants });
});

app.get('/admin', (req, res) => {
    const events = readEvents();
    res.render('admin', { events });
});

app.post('/admin/add', (req, res) => {
    const { name, date, description } = req.body;
    const events = readEvents();
    events.push({ name, date, description });
    writeEvents(events);
    res.redirect('/admin');
});

app.post('/admin/edit/:id', (req, res) => {
    const { id } = req.params;
    const { name, date, description } = req.body;
    const events = readEvents();
    events[id] = { name, date, description };
    writeEvents(events);
    res.redirect('/admin');
});

app.post('/admin/delete/:id', (req, res) => {
    const { id } = req.params;
    const events = readEvents();
    events.splice(id, 1);
    writeEvents(events);
    res.redirect('/admin');
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
