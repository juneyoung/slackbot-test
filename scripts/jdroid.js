//js version
//2015 07 08 Juneyoung Oh

//FortuneTeller

module.exports = function(robot){

	var mumbling_replies = [
		"Blah blah ..."
		, "Life is such boring!"
		, "Peter Piper picked a peck of pickled pepper. Did Peter Piper pick a peck of pickled pepper? If Peter Piper picked a peck of pickled pepper, Where's the peck of pickled pepper Peter Piper picked?"
	];

	setInterval(function(){
		robot.respond(function(msg){
			var pickIdx = Math.floor(Math.random() * mumbling_replies.length)
			msg.reply(mumbling_replies[pickIdx]);
		}, 60 * 1000);
	});

	robot.hear(/what is your name/igm, function(msg){
		msg.send(robot.name);
	});
};