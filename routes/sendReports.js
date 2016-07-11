var util = require('util'),
    path = require('path');

var sendReportController  = require(path.join(__dirname,'../controllers/sendReportController'));

//app is the express object
module.exports = function(app){

    app.post("/sendReports", function (req, res, next) {
        //sendReportController.send(req, res, app.models.MODEL_NAME);
    });

}