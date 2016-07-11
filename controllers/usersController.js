const path   = require("path");
const logger = require(path.join(__dirname, '../setup/init')).winston;
const request = require('request');
const constants = require(path.join(__dirname, "../setup/constants"));
const pageAccessToken = constants.PAGE_ACCESS_TOKEN;

const USER_PROFILE_URL = 'https://graph.facebook.com/v2.6/';

exports.saveObj = function(req, res, Users){

  request({ url: `${USER_PROFILE_URL}${req['user_id']}?access_token=${pageAccessToken}`, json: true },
    function(error, response, body) {
    if (!error && response.statusCode == 200) {
      body.uid = req['user_id'];
      Users.create(
        body
      ).then( function (users) {
        logger.info(__filename + " Test object created: " + users);
        return res.send(users);
      });


    }
  })



};
