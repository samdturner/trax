// for facebook verification
'use strict'

const util = require('util'),
      path = require('path'),
      request = require('request')

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


module.exports = function(app){

	const verifyToken = 'this_is_my_trax_password';


	app.get('/webhook/', function (req, res) {
		if (req.query['hub.verify_token'] === verifyToken) {
			res.send(req.query['hub.challenge'])
		}
		res.send('Error, wrong token')
	});

	// to post data
	app.post('/webhook/', function (req, res) {
		let messaging_events = req.body.entry[0].messaging
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
        }

        switch (event.message.quick_reply.payload) {
          case 'GOAL_GYM' || 'GOAL_WAKE_UP':
            sendTextMessage(sender, {
              text: "Great, and how often would you like me to check in?",
              quick_replies: FREQUENCY_OPTIONS
            });
            break;
          case 'FREQUENCY_WEEKDAYS' || 'FREQUENCY_WEEKENDS' || 'FREQUENCY_EVERY_DAY':
            sendTextMessage(sender, {
              text: "Thanks, your dreams are only a few taps away!"
            });
            break;
          default:
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


	// recommended to inject access tokens as environmental variables, e.g.
	// const token = process.env.PAGE_ACCESS_TOKEN
	const pageAccessToken = "EAAYv0vhTxk4BAC3LcTowQsjXtCWqWytg3rZCAa3e5b0oOTHNByZByPiRkg5UAxBDCml0aUi4aIuq62wgTw0L4I43tIf5f32x2rvjqfZB0D53ZB3OXVJolmu3nnTDn4yBf4ho5YG9sYHZBEE1UX2fEBL9tekoWe3gD2T4pdLxfFgZDZD";

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
