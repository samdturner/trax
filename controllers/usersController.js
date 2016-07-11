const path   = require("path");
const logger = require(path.join(__dirname, '../setup/init')).winston;
const request = require('request');
const constants = require(path.join(__dirname, "../setup/constants"));
const pageAccessToken = constants.PAGE_ACCESS_TOKEN;

const USER_PROFILE_URL = 'https://graph.facebook.com/v2.6/1356921494324269';

exports.saveObj = function(req, res, Users){

  request(`${USER_PROFILE_URL}?access_token=${pageAccessToken}`, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      let user = Object.assign({}, body, { uid: req['user_id']});
      console.log(JSON.stringify(user));
      console.log(`The user is: ${user}`);
      console.log(`The body is: ${body}`)
      Users.create(
        { user }
      ).then( function (users) {
        logger.info(__filename + " Test object created: " + users);
        return res.send(users);
      });


    }
  })



};
