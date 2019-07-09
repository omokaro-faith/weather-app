const path = require('path');
const express = require('express');
const hbs = require('hbs');
require('dotenv').config();
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

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
  if (!req.query.address) {
    return res.send({
      error: 'You must provide an address!'
    });
  }

  geocode(req.query.address, (error, response) => {
    if (error) {
      return res.send({ error });
    }
    const { latitude, longitude, location } = response;
    forecast(latitude, longitude, (error, data) => {
      if (error) {
        return res.send({ error });
      }

      res.send({
        forecast: data,
        location,
        address: req.query.address
      });
    });
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
