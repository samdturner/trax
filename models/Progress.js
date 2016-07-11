var Sequelize = require('sequelize'), path = require('path');
var constants = require(path.join(__dirname, '../setup/constants'));

module.exports = function(sequelize, logger){
	var Progress = sequelize.define('progress', {
		gid: Sequelize.STRING, //Goal id
		uid: Sequelize.STRING, // user id
		decision: Sequelize.BOOLEAN,
		is_active: Sequelize.BOOLEAN
	});

	Progress.sync({force: constants.DB_FORCE_CREATE}).then(function(){
		logger.info(__filename + " Progress table has been initialied!");
	});

	return Progress;
}