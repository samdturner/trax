'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const app = express()
const https = require('https')
const fs = require('fs')
const Sequelize = require('sequelize')
const path = require("path")

// initialize
var init = require(path.join(__dirname, "./setup/init"));
var constants = require(path.join(__dirname, "./setup/constants"));


app.set('port', (constants.HTTPS_PORT || 443))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))

// parse application/json
app.use(bodyParser.json())

app.logger = init.winston;
app.models ={
	Goals : init.Goals
};



// index
app.get('/', function (req, res) {
	res.send('Lets start tracking your goal  ')
})

// put all routes in it
require(path.join(__dirname, './routes/routes'))(app);


// spin spin sugar
https.createServer({
        key: fs.readFileSync(constants.HTTPS_KEY),
        cert: fs.readFileSync(constants.HTTPS_CERT)
    }, app).listen(constants.HTTPS_PORT);
