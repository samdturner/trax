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
    HTTPS_PORT  : 1443,
    TABLES: {
        GOALS: "goals",
        USERS: "users" 
    },
    HTTPS_KEY : "/etc/letsencrypt/live/goaltracker.us/privkey.pem",
    HTTPS_CERT: "/etc/letsencrypt/live/goaltracker.us/fullchain.pem",
    DB_FORCE_CREATE : "false"  //this informs if we need to clean up all table's data unpon initialization
}

