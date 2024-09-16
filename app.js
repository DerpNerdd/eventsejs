const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 5100;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

const eventsFilePath = path.join(__dirname, 'data', 'events.txt');


const readEvents = () => {
    const data = fs.readFileSync(eventsFilePath, 'utf8');
    return data.split('\n').filter(event => event).map(event => {
        const [name, date, description] = event.split('|');
        return { name, date, description };
    });
};


const writeEvents = (events) => {
    const data = events.map(event => `${event.name}|${event.date}|${event.description}`).join('\n');
    fs.writeFileSync(eventsFilePath, data);
};


app.get('/events', (req, res) => {
    const events = readEvents();
    res.render('events', { events });
});

app.post('/register', (req, res) => {
    const { name, email, event } = req.body;
    const registration = `${name}|${email}|${event}\n`;
    fs.appendFileSync(path.join(__dirname, 'data', 'registrations.txt'), registration);
    res.redirect('/events');
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
