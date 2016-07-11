var path   = require("path");
var logger = require(path.join(__dirname, '../setup/init')).winston;

exports.saveObj = function(req, res, Progress){

  Progress.create(
    { }
  ).then( function (progress) {
    logger.info(__filename + " Progress object created: " + progress);
    return res.send(progress);
  });

};




