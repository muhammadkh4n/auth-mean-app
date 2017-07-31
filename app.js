const bodyParser = require('body-parser');
const config = require('./config/database');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const passport = require('passport');

mongoose.connect(config.database);

const users = require('./routes/users');

const app = express(); // Initialize express

const port = process.env.PORT || 3000; // Set express port

// CORS Middleware
app.use(cors());

// Public folder (Static)
app.use(express.static(path.join(__dirname, 'public')));

// Body Parser MW
app.use(bodyParser.json());

// Routes
app.use('/users', users);

// index route
app.get('/', (req, res) => {
    res.send("Invalid Endpoint");
})

// Start listening at specified port
app.listen(port, () => {
    console.log("server started on port "+port);
});