module.exports = function (robot) {

	//register me 한 정보가 있으면 모든정보를 가져오고
	// 아니라면 slack 계정의 기본정보를 출력한다.

	robot.hear(/whoami/igm, function(msg){
		try{
			var userObj = robot.brain.userForId(msg.message.user.id);
			//var userObj = robot.brain.userForName(msg.message.user.name);
			//console.log(msg.message.user.id);
			robot.logger.info(userObj);
			msg.send(userObj);
		}catch(ex){
			console.log(msg);
		}

	});

	robot.hear(/whois/igm, function(msg){
		var userObj = robot.brain.usersForFuzzyName(name);
		var userId = userObj.id;
	});	

	robot.hear(/register me/igm, function(msg){

	});
};