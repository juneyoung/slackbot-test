//js version
//2015 07 08 Juneyoung Oh


module.exports = function(robot){

	var mumbling_replies = [
		"Blah blah ..."
		, "Life is such boring!"
		, "Peter Piper picked a peck of pickled pepper. 
		   Did Peter Piper pick a peck of pickled pepper? 
		   If Peter Piper picked a peck of pickled pepper, 
		   Where's the peck of pickled pepper Peter Piper picked?"
	];

	robot.hear(/I'm hugry/igm, function(msg){
		msg.send("So what?");
	}); 

	setInterval(60, function(){
		robot.respond(function(msg){
			var pickIdx = Math.floor(Math.random() * mumbling_replies.length)
		msg.reply(mumbling_replies[pickIdx]);
		});
	});

	robot.hear(/What is your name?/igm, function(msg){
		msg.send(robot.name);
	});
};