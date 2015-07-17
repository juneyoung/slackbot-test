//js version
//2015 07 08 Juneyoung Oh

//Mumbling Object for fun
var Mumbles = function(){
	this.lang = 'en';
	this.mumble_replies = [
		"Blah blah ..."
		, "Life is such boring!"
		, "Peter Piper picked a peck of pickled pepper. Did Peter Piper pick a peck of pickled pepper? If Peter Piper picked a peck of pickled pepper, Where's the peck of pickled pepper Peter Piper picked?"
		, "Betty Botter bought a bit of butter. The butter Betty Botter bought was a bit bitter, and made her batter bitter. But a bit of better butter makes batter better. So Betty Botter bought a bit of better butter, making Betty Botter's bitter batter better."
	];

	this.setLang = function(lang) {
		this.lang = lang;
		switch (this.lang) {
			case 'kr' : 
				this.setMumbles([
					'안 촉촉한 초코칩 나라에 살던 안 촉촉한 초코칩이 촉촉한 초코칩 나라의 촉촉한 초코칩을 보고 촉촉한 초코칩이 되고 싶어서 촉촉한 초코칩 나라에 갔는데 촉촉한 초코칩 나라의 문지기가 "넌 촉촉한 초코칩이 아니고 안 촉촉한 초코칩이니까 안 촉촉한 초코칩 나라에서 살아"라고 해서 안 촉촉한 초코칩은 촉촉한 초코칩이 되는 것을 포기하고 안 촉촉한 초코칩 나라로 돌아갔다'
					, '산 사람들과 선 사람 둘과 선사시대 사람들 속에 속해있는 사람들 속에서 선사람 둘을 솎아낼까. 선 사람 둘과 산 사람들과 선사시대 사람들 속에 섞여있는 선 사람들 속에 안 선사람을 더 섞을까. 선사시대 사람들과 산 사람들과 선 사람 둘이 전부 서서 서로가 서로를 서로 솎아내려 할 때 선사시대사람은 선 사람이나 안 선 사람이나 선한 사람이나 안 선 상태로 서로 손을 잡고 3433년 3월 13일 신시와 3시 33분 33초를 서로의 눈을 보며 말하자고 하였다.'
					, '들의 콩깍지는 깐 콩깍지인가 안 깐 콩깍지인가? 깐 콩깍지면 어떻고 안 깐 콩깍지면 어떠냐? 깐 콩깍지나 안 깐 콩깍지나 콩깍지는 다 콩깍지인데.'
					, '우리 집 옆집 앞집 뒷창살은 흩겹창살이고,우리집 뒷집 앞집 옆창살은 겹흩창살이다.'
				]);
				break;
			case 'jp' :
				this.setMumbles([
					'バスガス爆発 ばくはつ'
					, '赤 あか巻紙 まきがみ青 あお巻紙黄 き巻紙'
					, '生 なま麦 むぎ生米 ごめ生卵 たまご'
					, '蛙 カエルぴょこぴょこ三 みぴょこぴょこ合 あわせてぴょこぴょこ六 むぴょこぴょこ'
				]);
				break;
			case 'ger' :
				this.setMumbles([
					'Blaukraut bleibt Blaukraut und Brautkleid bleibt Brautkleid (und Plättbrett bleibt Plättbrett und graublau bleibt graublau und bleifrei bleibt bleifrei und Grießbrei bleibt Grießbrei und Kriegsbeil bleibt Kriegsbeil).'
					, 'Ein weißer Whiskeymixer mixt weißen Whiskey. Weißen Whiskey mixt ein weißer Whiskeymixer'
					, 'Der Cottbuser Postkutscher putzt den Cottbuser Postkutschkasten blank.'
					, 'Fromme Frösche fressen frische Frühlingszwiebeln, aber freche Frösche fressen frische Früchte.'
				]);
				break;
			default :;
		}
		return this;
	}

	this.setMumbles = function(list){
		mumble_replies = [];
		mumble_replies = list;
		return this.mumble_replies;
	}

	this.getMumbleList = function(){
		return this.mumble_replies;
	}
}

//default = en
var MUMBLES = MUMBLES || new Mumbles();

module.exports = function(robot){

	const mumbleCmd = 'mumble';
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

	robot.hear(/mumble on/igm, function(msg){
		var lang = splitCmd(rmSlackUserSyntax(msg))[2];
		MUMBLES.setLang(lang);
		if(!checkThreadIsRunning(mumbleCmd)){
			runHeartbeat(mumbleCmd, function(){
				msg.send(getMumbling());
			}, 10);
		}
	});

	robot.hear(/mumble off/igm, function(){
		if(checkThreadIsRunning(mumbleCmd)){
			stopHeartbeat(mumbleCmd);
		}
	});

	robot.respond(/show threads/igm, function(msg){
		msg.reply(getAllThreadNames());
	});

	//=========================================================================
	//=========================================================================	
	/* Internal functions */

	/* Functions which shall Injected into Thread management function */
	var getMumbling = function(){
		var pickIdx = Math.floor(Math.random() * MUMBLES.getMumbleList().length);
		var quoteList = MUMBLES.getMumbleList();
		robot.logger.info(quoteList[pickIdx]);
		return quoteList[pickIdx];
	};
	
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
		if(!(msg.message.text.indexOf('@') == 0)) return msg.message.text;
		var originalSlackMsg = msg.message.rawText;
		// basic format <@user>: text
		var cmd = originalSlackMsg.split(':')[1];
		return cmd.trim();
	}
};