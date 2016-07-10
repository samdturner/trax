var util = require('util'),
    path = require('path');

var askQnsController  = require(path.join(__dirname,'../controllers/askQnsController'));

//app is the express object
module.exports = function(app){

    app.post("/ansQns", function (req, res, next) {
        //askQnsController.send(req, res, app.models.MODEL_NAME);
    });

}