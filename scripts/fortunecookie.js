//cmd >> give me a fortune cookie
//version control :
//0.01 get random text only - 2015.07.17
//0.02 assign a fortune to a user by day unit
'use strict';


var FortuneCookie = function () {

	this.lang = 'en';
	this.fortunes = [
		{"en" : "He is in a jam", "kr" : "그는 지금 난처한 상황에 처해 있다."}
		, {"en" : "Never give up. Always find a reason to keep trying"}
		, {"en" : "The quotes that you do not understand, are not meant for you"}
		, {"en" : "Don't worry about things in the past, there is nothing you can do about them now. Don't worry about things that are happening now, make the best of a bad situation. Don't worry about things in the future, they may never happen"}
		, {"en" : "Your passions sweep you away"}
		, {"en" : "Jealousy doesn't open doors, it closes them!"}
		, {"en" : "You have a great capability to break cookies - use it wisely!"}
		, {"en" : "Serious trouble will bypass you"}
		, {"en" : "If winter comes, can spring be far behind?"}
		, {"en" : "When you get something for nothing, you just haven't been billed for it yet"}
		, {"en" : "Volition, Strength, Languages, Freedom and Power rests in you"}
		, {"en" : "Spring has sprung. Life is blooming"}
		, {"en" : "Be calm when confronting an emergency crisis"}
		, {"en" : "Focus in on the color yellow tomorrow for good luck!"}
	]

	this.init = function(lang){
		if(lang != null || typeof lang != 'undefined') this.lang = lang;
		return this;
	}

	this.getFortuneText = function (fortune) {
		if(this.lang == null || typeof this.lang == 'undefined') this.lang = 'en';
		var text = fortune[this.lang];

		if(text == null || typeof text == 'undefined') {
			text = fortune.en;
		}
		return text;
	} 

	this.getCookie = function () {
		var ret = '';
		var cookieIdx = Math.floor(Math.random() * this.fortunes.length);
		ret = this.getFortuneText(this.fortunes[cookieIdx]);
		return ret;
	};
}

var FORTUNECOOKIE = FORTUNECOOKIE || new FortuneCookie();

module.exports = function(robot) {
	robot.hear(/give me a fortune cookie/igm, function(msg){
		try{
			msg.send('¯\_(ツ)_/¯ ' + FORTUNECOOKIE.init(getLang(msg.message.text)).getCookie());
		}catch(exception){
			console.log('An exception has occured >> ' + exception);
			console.log('Recieved message is >> ' + msg);
		}
	});	

	function getLang (cmd) {
		var cmds = cmd.split(' ');
		var tmpStr = cmds[cmds.length - 1];
		var ret = 'en';
		if(cmds.length > 5 && !tmpStr.match(/cookie/igm)) ret = tmpStr;
		console.log('language is ' + ret);
		return ret;
	}
};