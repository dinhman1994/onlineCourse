var CronJob = require('cron').CronJob;
const traineeService = require('./services/traineeService');

module.exports.checkFailTime = new CronJob('* * * * * *', function() {
		traineeService.checkTraineeFail();
	}, null, false, 'America/Danmarkshavn');