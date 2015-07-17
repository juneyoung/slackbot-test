module.exports = function (robot) {

	//register me 한 정보가 있으면 모든정보를 가져오고
	// 아니라면 slack 계정의 기본정보를 출력한다.

	robot.hear(/whoami/igm, function(msg){
		try{
			var userObj = robot.brain.userForId(msg.message.user.id);
			var answerStr = stringifyObject(userObj);
			msg.send(answerStr);
		}catch(ex){
			robot.logger.info('Your user data is currupted :-(');
		}
	});

	robot.hear(/whois/igm, function(msg){
		try{
			var name = getLastParam('whois', msg.message.text);
			var userObj = robot.brain.usersForFuzzyName(name);
			robot.logger.info(userObj);
		}catch(ex){
			console.log(ex);
			robot.logger.info(msg);
		}
	});	

	robot.hear(/register me/igm, function(msg){

	});

	var getLastParam = function (cmd, message) {
		var params = message.split(' ');
		var lastParam = params[params.length - 1];
		if(lastParam == cmd) return '';
		return lastParam;
	}

	var stringifyObject = function (obj) {
		var ret = '';
		for(data in obj) {
			var singleLine = data + ' : ' + obj[data] + '\n';
			ret += singleLine;
		}
		return ret;
	}
};