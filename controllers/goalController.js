var path   = require("path");
var logger = require(path.join(__dirname, '../setup/init')).winston;

exports.saveObj = function(req, res, Goals){

  Goals.create(
    { }
  ).then( function (goals) {
    logger.info(__filename + " Goal object created: " + goals);
    return res.send(goals);
  });

};




