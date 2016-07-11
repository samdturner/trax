var path   = require("path");
var logger = require(path.join(__dirname, '../setup/init')).winston;

exports.saveObj = function(req, res, Test){

    let messaging_events = req.body.entry[0].messaging


    for (let i = 0; i < messaging_events.length; i++) {
      let event = req.body.entry[0].messaging[i]

      Test.create(
        { "obj": event}
      ).then( function (tests) {
        logger.info(__filename + " Test object created: " + tests.obj);
        return res.send(tests);
      });

    }

};




