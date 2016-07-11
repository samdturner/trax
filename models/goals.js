var Sequelize = require('sequelize'), path = require('path');
var constants = require(path.join(__dirname, '../setup/constants'));

module.exports = function(sequelize, logger){
	var Goals = sequelize.define('goals', {
		gid: Sequelize.STRING,
		uid: Sequelize.STRING,
		defination: Sequelize.STRING,
		freq: Sequelize.STRING,
		is_active: Sequelize.BOOLEAN
	});

	Goals.sync({force: constants.DB_FORCE_CREATE}).then(function(){
		logger.info(__filename + " Goal table has been initialied!");
	});

	return Goals;
}