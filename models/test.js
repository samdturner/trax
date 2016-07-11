var Sequelize = require('sequelize'), path = require('path');
var constants = require(path.join(__dirname, '../setup/constants'));

module.exports = function(sequelize, logger){
	var Test = sequelize.define('test', {
		obj: Sequelize.JSONB
	});

	Test.sync({force: constants.DB_FORCE_CREATE}).then(function(){
		logger.info(__filename + " Test table has been initialied!");
	});

	return Test;
}