module.exports = function (robot) {

	//register me 한 정보가 있으면 모든정보를 가져오고
	// 아니라면 slack 계정의 기본정보를 출력한다.

	robot.respond("make me dinner now!", function(msg) {
	  msg.reply("I'll tell the chef to prepare your "+process.env.HUBOT_FAVOURITE_MEAL+" right away sir!");
	});

	robot.respond(/whoami/igm, function(msg){
		try{
			var userObj = robot.brain.userForId(msg.message.user.id);
			msg.reply(stringifyObject(userObj));
		}catch(ex){
			robot.logger.info('Your user data is currupted :-(');
		}
	});

	robot.respond(/whois/igm, function(msg){
		try{
			var name = getLastParam('whois', msg.message.text);
			var userObj = robot.brain.usersForFuzzyName(name);
			var ret = '';
			if(userObj instanceof Array){
				for(var i = 0; i < userObj.length; i++){
					ret += stringifyObject(userObj[i]);
				}
			}else{
				ret = stringifyObject(userObj);
			}
			msg.reply(ret);
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
		return (lastParam.startsWith('@')) ? lastParam.substring(1, lastParam.length) : lastParam;
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