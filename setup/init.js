/*
	initialize some system parameters
*/

var path = require('path');
var winston = require("winston");
var Sequelize = require('sequelize');
var HashMap = require("hashmap");
var constants = require(path.join(__dirname, './constants'));

//create a single hashmap
var map = new HashMap();

exports.map = map;

winston.add(
	winston.transports.File, 
	{
		filename: constants.LOG,
		level: constants.LOG_LEVEL,
		timestamp: true,
		json: true,
        colorize: true
	}
);
winston.remove(winston.transports.Console);

//create a singleton for logging
exports.winston = winston;

//create a singleton for DB connection
var sequelize = new Sequelize(constants.DB_NAME, constants.USER_NAME, constants.PASSWORD, {
	host: constants.RDS_HOST,
	dialect: constants.DB_DIALECT
});

//Creating models 
var Goals = require(path.join(__dirname, '../models/goals'))(sequelize, winston);
var Test = require(path.join(__dirname, '../models/test'))(sequelize, winston);


exports.Goals = Goals;
exports.Test = Test;





