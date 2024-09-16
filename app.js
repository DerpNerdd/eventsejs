const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 5100;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
const eventsFilePath = path.join(__dirname, 'data/events.json');


app.get('/events', (req, res) => {
    fs.readFile(path.join(__dirname, 'data/events.json'), 'utf8', (err, data) => {
        if (err) throw err;
        const events = JSON.parse(data); 
        res.render('events', { events }); 
    });
});



const readEvents = () => {
    const data = fs.readFileSync(eventsFilePath, 'utf8');
    return JSON.parse(data);
};

const writeEvents = (events) => {
    const data = JSON.stringify(events, null, 2);
    fs.writeFileSync(eventsFilePath, data);
};


app.get('/', (req, res) => {
    res.redirect('/events');
});


app.get('/events', (req, res) => {
    const events = readEvents();
    res.render('events', { events });
});



app.post('/register', (req, res) => {
    const { name, email, event } = req.body;
    const registration = `${name}|${email}|${event}\n`;
    fs.appendFileSync(path.join(__dirname, 'data', 'registrations.json'), registration);
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
