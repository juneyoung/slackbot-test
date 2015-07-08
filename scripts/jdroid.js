//js version
//2015 07 08 Juneyoung Oh


module.exports = function(robot){

	var fourword_replies = [
		"Yeah, fuck you, too"
		, "Suck my dick!"
		, "Why? Call your mama"
	];

	robot.hear("I'm hugry", function(msg){
		msg.send("Eat your own flesh");
	}); 

	robot.respond("fuck you", function(msg){
		var pickIdx = Math.floor(Math.random() * fourword_replies.length)
		msg.reply(fourword_replies[pickIdx]);
	});

	robot.hear("What is your name?", function(msg){
		msg.send(robot.name);
	});
}
