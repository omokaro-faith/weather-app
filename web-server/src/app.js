const path = require('path');
const express = require('express');
const hbs = require('hbs');

const app = express();

// Define paths for Express config
const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and view location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialPath);

// Setup static directory to serve
app.use(express.static(publicDirPath));

// Routes
app.get('/', (rew, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Omokaro Faith'
  });
});

app.get('/about', (req, res) => {
  res.render('about',  {
    title: 'About Me',
    name: 'Omokaro Faith'
  })
});

app.get('/help', (req, res) => {
  res.render('help',{
    title: 'Help',
    name: 'Omokaro Faith'
  });
});

app.get('/weather', (req, res) => {
  res.send({
    forecast: 'It is snowing',
    location: 'Philadephia'
  });
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Omokaro Faith',
    errorMessage: 'Help article not found.'
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Omokaro Faith',
    errorMessage: 'Page Not Found'
  });
});

app.listen('3000', () => {
  console.log('currently running on port 3000');
});
