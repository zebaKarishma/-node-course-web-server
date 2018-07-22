const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');
//static takes the absolute path of the folder to be served
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
    let now = new Date().toString();
    let log = `${now}: ${req.method} ${req.url}`;
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to append to server.log');
        }
    })
    console.log(log + '\n');
    next();
});

// app.use((req, res) => {
//     res.render('maintenance.hbs', {
//         pageTitle: "Oops !!!",
//         welcomeMessage: "This site is being updated.Will be right back soon."
//     })
// })

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {
    //res.send('<h1>Hello Express !!</h1>');
    res.render('home.hbs', {
        pageTitle: "Home",
        welcomeMessage: "Welcome to world of Node.js"
    })
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: "About"
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Unable to handle requests'
    })
});

app.listen(port, () => {
    console.log('Server is up and runnning on port', port);
});