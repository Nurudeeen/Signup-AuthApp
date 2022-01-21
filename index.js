const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

require("dotenv").config();


// set up express app
const app = express();

// connect to mongodb
mongoose.connect('mongodb://127.0.0.1:27017/usersdb');
mongoose.Promise = global.Promise;

// use body-parser middleware
app.use(bodyParser.json());

// initialize routes
app.use('/api', require('./routes/api'));
app.use('/api', require('./routes/post'));
app.use('/api', require('./routes/getOne'));
app.use('/api', require('./routes/welcome'));

// error handling middleware
app.use(function(err, req, res, next){
    console.log(err); // to see properties of message in our console
    res.status(422).send({error: err.message});
});

// listen for requests
app.listen(process.env.port || 3000, function(){
    console.log('now listening for requests');
});