var Mumbles = function(lang){
	var mumble_replies = [];

	switch (lang) {
		case 'en' : 
			mumble_replies = [
				"Blah blah ..."
				, "Life is such boring!"
				, "Peter Piper picked a peck of pickled pepper. Did Peter Piper pick a peck of pickled pepper? If Peter Piper picked a peck of pickled pepper, Where's the peck of pickled pepper Peter Piper picked?"
				, "Betty Botter bought a bit of butter. The butter Betty Botter bought was a bit bitter, and made her batter bitter. But a bit of better butter makes batter better. So Betty Botter bought a bit of better butter, making Betty Botter's bitter batter better."
			];
			break;
		case 'jp' :
			mumbling_replies = [
				'バスガス爆発 ばくはつ'
				, '赤 あか巻紙 まきがみ青 あお巻紙黄 き巻紙'
				, '生 なま麦 むぎ生米 ごめ生卵 たまご'
				, '蛙 カエルぴょこぴょこ三 みぴょこぴょこ合 あわせてぴょこぴょこ六 むぴょこぴょこ'
			]
			break;
		case 'ger' :
			mumble_replies = [
				'Blaukraut bleibt Blaukraut und Brautkleid bleibt Brautkleid (und Plättbrett bleibt Plättbrett und graublau bleibt graublau und bleifrei bleibt bleifrei und Grießbrei bleibt Grießbrei und Kriegsbeil bleibt Kriegsbeil).'
				, 'Ein weißer Whiskeymixer mixt weißen Whiskey. Weißen Whiskey mixt ein weißer Whiskeymixer'
				, 'Der Cottbuser Postkutscher putzt den Cottbuser Postkutschkasten blank.'
				, 'Fromme Frösche fressen frische Frühlingszwiebeln, aber freche Frösche fressen frische Früchte.'
			]

			break;
		default :
			mumble_replies = [
				'안 촉촉한 초코칩 나라에 살던 안 촉촉한 초코칩이 촉촉한 초코칩 나라의 촉촉한 초코칩을 보고 촉촉한 초코칩이 되고 싶어서 촉촉한 초코칩 나라에 갔는데 촉촉한 초코칩 나라의 문지기가 "넌 촉촉한 초코칩이 아니고 안 촉촉한 초코칩이니까 안 촉촉한 초코칩 나라에서 살아"라고 해서 안 촉촉한 초코칩은 촉촉한 초코칩이 되는 것을 포기하고 안 촉촉한 초코칩 나라로 돌아갔다'
				, '산 사람들과 선 사람 둘과 선사시대 사람들 속에 속해있는 사람들 속에서 선사람 둘을 솎아낼까. 선 사람 둘과 산 사람들과 선사시대 사람들 속에 섞여있는 선 사람들 속에 안 선사람을 더 섞을까. 선사시대 사람들과 산 사람들과 선 사람 둘이 전부 서서 서로가 서로를 서로 솎아내려 할 때 선사시대사람은 선 사람이나 안 선 사람이나 선한 사람이나 안 선 상태로 서로 손을 잡고 3433년 3월 13일 신시와 3시 33분 33초를 서로의 눈을 보며 말하자고 하였다.'
				, '들의 콩깍지는 깐 콩깍지인가 안 깐 콩깍지인가? 깐 콩깍지면 어떻고 안 깐 콩깍지면 어떠냐? 깐 콩깍지나 안 깐 콩깍지나 콩깍지는 다 콩깍지인데.'
				, '우리 집 옆집 앞집 뒷창살은 흩겹창살이고,우리집 뒷집 앞집 옆창살은 겹흩창살이다.'
			]
	}
	this.getMumbleList = function(){
		return mumble_replies;
	}
}