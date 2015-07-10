//js version
//2015 07 08 Juneyoung Oh

//FortuneTeller

module.exports = function(robot){

	var mumbling_replies = [
		"Blah blah ..."
		, "Life is such boring!"
		, "Peter Piper picked a peck of pickled pepper. Did Peter Piper pick a peck of pickled pepper? If Peter Piper picked a peck of pickled pepper, Where's the peck of pickled pepper Peter Piper picked?"
	];

	var scheduledMumble = function(){

		console.log(robot.room);

		var pickIdx = Math.floor(Math.random() * mumbling_replies.length);
		robot.logger.info(mumbling_replies[pickIdx]);
		robot.send(null, mumbling_replies[pickIdx]);
	};

	robot.hear(/what is your name/igm, function(msg){
		msg.send(robot.name);
	});

	setInterval(scheduledMumble, 60 * 1000);
};