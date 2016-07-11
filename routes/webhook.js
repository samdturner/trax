// for facebook verification
'use strict'

const util = require('util');
const path = require('path');
const constants = require(path.join(__dirname, "../setup/constants"));
const USER_DOMAIN = 'https://graph.facebook.com/v2.6/1356921494324269';

const request = require('request'),
      pageAccessToken = constants.PAGE_ACCESS_TOKEN,
      verifyToken = constants.VERIFY_TOKEN;

const GOAL_OPTIONS = [
                        {
                          "content_type": "text",
                          "title": "Go to the gym",
                          "payload": "GOAL_GYM"
                        },
                        {
                          "content_type": "text",
                          "title": "Wake up early",
                          "payload": "GOAL_WAKE_UP"
                        }
                    ];

const FREQUENCY_OPTIONS = [
                        {
                          "content_type": "text",
                          "title": "Weekdays",
                          "payload": "FREQUENCY_WEEKDAYS"
                        },
                        {
                          "content_type": "text",
                          "title": "Weekends",
                          "payload": "FREQUENCY_WEEKENDS"
                        },
                        {
                          "content_type": "text",
                          "title": "Every day",
                          "payload": "FREQUENCY_EVERY_DAY"
                        }
                    ];

var webhookController  = require(path.join(__dirname,'../controllers/webhookController'));
var testController  = require(path.join(__dirname,'../controllers/testController'));


module.exports = function(app){



	app.get('/webhook/', function (req, res) {
		if (req.query['hub.verify_token'] === verifyToken) {
			res.send(req.query['hub.challenge'])
		}
		res.send('Error, wrong token')

	});

	// to post data
	app.post('/webhook/', function (req, res) {
    console.log('In POST request');
		let messaging_events = req.body.entry[0].messaging

		//Test DB Connection
		testController.saveObj(req, res, app.models.Test)

		for (let i = 0; i < messaging_events.length; i++) {
			let event = req.body.entry[0].messaging[i]



			let sender = event.sender.id
			if (event.message && event.message.text) {
				let text = event.message.text
				if (text === 'Generic') {
					sendGenericMessage(sender)
					continue
				}

        if(event.message.text === 'Get started') {
          sendTextMessage(sender, {
            text: "Your life is about to be changed!  What goal would you like to start tracking?",
            quick_replies: GOAL_OPTIONS
          });

          request
          .get(`${USER_DOMAIN}?access_token=${pageAccessToken}`)
          .on('response', function(response) {
            console.log(response);
            console.log(response.body); // 200
          })
        }

        if(event.message.quick_reply) {
          switch (event.message.quick_reply.payload) {
            case 'GOAL_WAKE_UP':
            case 'GOAL_GYM':
            {
              sendTextMessage(sender, {
                text: "Great, and how often would you like me to check in?",
                quick_replies: FREQUENCY_OPTIONS
              });
              break;
            }
            case 'FREQUENCY_WEEKDAYS':
            case 'FREQUENCY_WEEKENDS':
            case 'FREQUENCY_EVERY_DAY':
            {
              sendTextMessage(sender, {
                text: "Thanks, your dreams are only a few taps away!"
              });
              break;
            }
          }
        }
			}
			if (event.postback) {
				let text = JSON.stringify(event.postback)
				sendTextMessage(sender, "Postback received: "+text.substring(0, 200), pageAccessToken)
				continue
			}
		}
		res.sendStatus(200)
	});


	function sendTextMessage(sender, messageData) {
		request({
			url: 'https://graph.facebook.com/v2.6/me/messages',
			qs: {access_token:pageAccessToken},
			method: 'POST',
			json: {
				recipient: {id:sender},
				message: messageData,
			}
		}, function(error, response, body) {
			if (error) {
				console.log('Error sending messages: ', error)
			} else if (response.body.error) {
				console.log('Error: ', response.body.error)
			}
		})
	};

	function sendGenericMessage(sender) {
		let messageData = {
			"attachment": {
				"type": "template",
				"payload": {
					"template_type": "generic",
					"elements": [{
						"title": "First card",
						"subtitle": "Element #1 of an hscroll",
						"image_url": "http://messengerdemo.parseapp.com/img/rift.png",
						"buttons": [{
							"type": "web_url",
							"url": "https://www.messenger.com",
							"title": "web url"
						}, {
							"type": "postback",
							"title": "Postback",
							"payload": "Payload for first element in a generic bubble",
						}],
					}, {
						"title": "Second card",
						"subtitle": "Element #2 of an hscroll",
						"image_url": "http://messengerdemo.parseapp.com/img/gearvr.png",
						"buttons": [{
							"type": "postback",
							"title": "Postback",
							"payload": "Payload for second element in a generic bubble",
						}],
					}]
				}
			}
		}
		request({
			url: 'https://graph.facebook.com/v2.6/me/messages',
			qs: {access_token:pageAccessToken},
			method: 'POST',
			json: {
				recipient: {id:sender},
				message: messageData,
			}
		}, function(error, response, body) {
			if (error) {
				console.log('Error sending messages: ', error)
			} else if (response.body.error) {
				console.log('Error: ', response.body.error)
			}
		})
	};
}
