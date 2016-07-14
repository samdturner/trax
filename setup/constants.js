/*
	provid constants and properties
*/

module.exports = {

	RDS_HOST  	: "facebook-app-trax.cvds7yh3fual.us-west-2.rds.amazonaws.com",
	USER_NAME 	: "tracker",
	PASSWORD	: "trackerX",
	DB_NAME		: "trax",
	DB_DIALECT	: "postgres",
	LOG			: "logs/test.log",
	LOG_LEVEL	: "debug",
    LOG_TIMESTAMP: true,
    HTTPS_PORT  : 443,
    TABLES: {
        GOALS: "goals",
        USERS: "users" 
    },
    HTTPS_KEY : "/etc/letsencrypt/live/goaltracker.us/privkey.pem",
    HTTPS_CERT: "/etc/letsencrypt/live/goaltracker.us/fullchain.pem",
    DB_FORCE_CREATE : "false",  //this informs if we need to clean up all table's data unpon initialization
		PAGE_ACCESS_TOKEN: "EAAYv0vhTxk4BAC3LcTowQsjXtCWqWytg3rZCAa3e5b0oOTHNByZByPiRkg5UAxBDCml0aUi4aIuq62wgTw0L4I43tIf5f32x2rvjqfZB0D53ZB3OXVJolmu3nnTDn4yBf4ho5YG9sYHZBEE1UX2fEBL9tekoWe3gD2T4pdLxfFgZDZD",
		VERIFY_TOKEN: "this_is_my_trax_password"
}

