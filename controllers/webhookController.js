var path   = require("path");
var logger = require(path.join(__dirname, '../setup/init')).winston;

exports.storeGoal = function(req, res, Goals){

  var gid = req.query.gid || null;
  var uid  = req.query.uid || null ;
  
  //var startTime = req.query._startTime || null;

  Goals.create(
    { "gid": sid, "uid": ip }
  ).then( function (goalinfo) {
    logger.info(__filename + " Created: " + goalinfo.gid + " " + goalinfo.uid );
    return res.send(goalinfo);
  });

};




