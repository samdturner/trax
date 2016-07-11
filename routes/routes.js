'use strict'
/*
    mount all routes
*/

var path = require('path');

var sendReports = require(path.join(__dirname, './sendReports'));
var webhook = require(path.join(__dirname, './webhook'));
var askQns = require(path.join(__dirname, './askQns'));



//app is the express object
module.exports = function(app){
    //error handling
    app.use(function(err, req, res, next){
        app.logger.error("There is error on goal tracker server: " + err.name + " " +  err.message);
        res.status(202).end("Unknown issue");
    });

    //mount these routes
    sendReports(app);
    webhook(app);
    askQns(app);

}
