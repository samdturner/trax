var path   = require("path");
var logger = require(path.join(__dirname, '../setup/init')).winston;

exports.saveObj = function(req, res, Users){


  Users.create(
    { }
  ).then( function (users) {
    logger.info(__filename + " Test object created: " + users);
    return res.send(users);
  });

};




