const path   = require("path");
const logger = require(path.join(__dirname, '../setup/init')).winston;
const request = require('request');

const USER_DOMAIN = 'https://graph.facebook.com/v2.6/1356921494324269';

exports.saveObj = function(req, res, Users){

  request(`${USER_DOMAIN}?access_token=${pageAccessToken}`, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      let user = Object.assign({}, body, { uid: req['user_id']});
      console.log(user);
      Users.create(
        { user }
      ).then( function (users) {
        logger.info(__filename + " Test object created: " + users);
        return res.send(users);
      });


    }
  })



};
