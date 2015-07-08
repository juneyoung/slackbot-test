//js version
//2015 07 08 Juneyoung Oh

module.exports = function(robot){
	robot.hear("I'm hugry", function(msg){
		msg.send("Eat your own flesh");
	}); 

	robot.respond("fuck you", function(msg){
		msg.reply("Yeah, fuck yo, too");
	});

	robot.hear("What is your name?", function(msg){
		msg.send(robot.name);
	});
}