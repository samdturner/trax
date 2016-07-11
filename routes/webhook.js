// for facebook verification

const util = require('util'),
      path = require('path'),
      request = require('request')

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
        let metadataString = event.message.metadata || "undefined";
				sendTextMessage(sender, "The metadata string is: " + metadataString)
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

	function sendTextMessage(sender, text) {
		let messageData = {
      text:text,
      quick_replies: [
        {
          "content_type":"text",
          "title":"Red",
          "payload":"DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_RED"
        },
        {
          "content_type":"text",
          "title":"Green",
          "payload":"DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_GREEN"
        }
      ],
      metadata: "this is metadata!!"
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
