//js version
//2015 07 08 Juneyoung Oh

const SLACK_API_TOKEN = 'xoxp-7186818662-7186899793-7811139362-ccc6df';

module.exports = function(robot){
	var threads = [];

	// To control threads in js
	// Every thread should be designed in singleton pattern
	var ScheduledTask = function(name, object){
		this.name = name;
		this.object = object;

		this.getName = function(){
			return this.name;
		}

		this.getObject = function(){
			return this.object;
		}
	} 


	//=========================================================================
	//=========================================================================
	/* robot.hear */

	robot.hear(/what is your name/igm, function(msg){
		msg.send(robot.name);
	});

	robot.hear(/show threads/igm, function(msg){
		msg.send(getAllThreadNames());
	});

	//=========================================================================
	//=========================================================================	
	/* Internal functions */

	/* Functions which shall Injected into Thread management function */
	
	//=========================================================================
	//=========================================================================
	/* Controlling threads */
	var checkThreadIsRunning = function(key) {
		var ret = false;
		for(var i = 0; i < threads.length; i++) {
			var single = threads[i];
			if(single.getName() == key){
				ret = true;
				break;
			}
		}
		if(ret) console.log('thread [' + key + '] is already running.');
		return ret;
	}

	var runHeartbeat = function (key, func, duration) {
		if(duration == null || typeof duration == 'undefined') duration = 10;
		var tmp = setInterval(func, duration * 1000);	
		var tmpThread = new ScheduledTask(key, tmp);
		threads.push(tmpThread);
	}

	var stopHeartbeat = function(key) {
		var tmpArray = [];
		for(var i = threads.length - 1; i >= 0; i--) {
			var single = threads[i];
			if(single.getName() != key){
				tmpArray.push(single);
			}else{
				clearInterval(single.getObject());
			}
		}
		threads = [];
		threads = tmpArray;
		console.log('left thread list >> ' + threads);
	}

	var getAllThreadNames = function(){
		var ret = '';
		for(var i = 0; i < threads.length; i++) {
			ret += (threads[i].getName() + '\n'); 
		}
		if(threads.length == 0) ret = 'Currently no thread is running.';
		return ret;
	}

	//=========================================================================
	//=========================================================================
	/* Common Functions */
	var isEmpty = function (value) {
		var ret = false;
		ret = (value == null || typeof value == 'undefined') ? true : false;
		return ret;
	}

	var splitCmd = function (originalInput) {
		return originalInput.split(' ');
	}

	//=========================================================================
	//=========================================================================
	/* Slack Message Handling */

	function rmSlackUserSyntax(msg) {
		if(!(msg.message.text.indexOf('@') == 0)) return msg.message.rawText;
		var originalSlackMsg = msg.message.rawText;
		// basic format <@user>: text
		var cmd = originalSlackMsg.split(':')[1];
		return cmd.trim();
	}
};