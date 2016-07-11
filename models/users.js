var Sequelize = require('sequelize'), path = require('path');
var constants = require(path.join(__dirname, '../setup/constants'));

module.exports = function(sequelize, logger){
	var Users = sequelize.define('users', {
		uid: Sequelize.STRING,
		first_name: Sequelize.STRING,
		last_name: Sequelize.STRING,
		profile_pic: Sequelize.STRING,
		locale: Sequelize.STRING,
		timezone: Sequelize.INTEGER,
		gender: Sequelize.STRING
	});

	Users.sync({force: constants.DB_FORCE_CREATE}).then(function(){
		logger.info(__filename + " User table has been initialied!");
	});

	return Users;
}
