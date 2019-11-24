//tutorial from https://gamedevelopment.tutsplus.com/tutorials/how-to-make-your-first-roguelike--gamedev-13677
var fontSize = 32;

//Map Dimensions and number of players
var rows = 20;
var columns = 20;

var actors = 10;
var player;
var actorList;
var livingEnemies;

var actorMap;

//map structure
var map;

//screen
var asciidisplay;

//initalize some stuff
var game = new Phaser.Game(columns * fontSize *0.6 , rows * fontSize , Phaser.AUTO, null, {
	create: create
});

function create() {
	//init keyboard commands
	game.input.keyboard.addCallbacks(null,null,onKeyUp);

	//map
	initMap();

	//screen
	asciidisplay = [];
	for (var y = 0; y < rows; y++){
		var newRow = [];
		asciidisplay.push(newRow);
		for (var x = 0; x < columns; x++)
			newRow.push(initCell('', x, y));
	}

	initActors();
	drawMap();
	drawActors();
}

function initCell(chr,x,y){
	//add a single cell in a given position to the ascii display
	var style = {font: fontSize+"px monospace", fill:"#fff"};
	return game.add.text(fontSize*0.6*x, fontSize*y, chr, style);
}

function onKeyUp(event){
	drawMap();

	var acted = false;
	switch (event.keyCode) {
		case Phaser.Keyboard.LEFT:
			acted = moveTo(player, {x:-1, y:0});
			break;

		case Phaser.Keyboard.RIGHT:
			acted = moveTo(player, {x:1, y:0});
			break;
		
		case Phaser.Keyboard.UP:
			acted = moveTo(player, {x:0, y:-1});
			break;
		
		case Phaser.Keyboard.DOWN:
			acted = moveTo(player, {x:0, y:1});
			break;
	}

	if(acted)
		for(var enemy in actorList){
			//skip the player
			if(enemy == 0)
				continue;

			var e = actorList[enemy];
			if (e != null)
				aiAct(e);
		}

	drawActors();
}

function drawMap(){
	for (var y = 0; y < rows; y++)
		for (var x = 0; x < columns; x++)
			asciidisplay[y][x].content = map[y][x];
}

function initMap() {
	//create random map
	map=[];
	for (var y = 0; y < rows; y++){
		var newRow = [];
		for (var x = 0; x < columns; x++){
			if(Math.random() > 0.8)
				newRow.push('#');
			else
				newRow.push('.');
		}

		map.push(newRow);
	}
}

function randomInt(max){
	return Math.floor(Math.random() * max);
}

function drawActors(){
	for (var a in actorList){
		if(actorList[a] != null && actorList[a].hp >0)
			asciidisplay[actorList[a].y][actorList[a].x].content = a == 0 ? '' + player.hp:'e';
	}
}

function canGo(actor, dir){
	return actor.x+dir.x >= 0 &&
		   actor.x+dir.x <= columns - 1 &&
		   actor.y+dir.y >= 0 &&
		   actor.y+dir.y <= rows - 1 &&
		   map[actor.y+dir.y][actor.x+dir.x] == '.';
}

function moveTo(actor,dir){
	//check to see if the actor can go that way.
	if(!canGo(actor,dir))
		return false;

	//move actor
	var newKey = (actor.y + dir.y) + '_' + (actor.x + dir.x);
	// if the destination has an actor in it
	if(actorMap[newKey] != null) {
		//damage destination tile
		var target = actorMap[newKey];
		target.hp--;

		//if it's dead remove it
		if(target.hp == 0) {
				actorMap[newKey] = null;
				actorList[actorList.indexOf(target)] = null;
				if(target!=player){
					livingEnemies--;
					if(livingEnemies == 0) {
						//Victory
						var victory = game.add.text(game.world.centerX, game.world.centerY, 'Victory!\nCtrl+r to restart', { fill : '#2e2', align: "center" } );
						victory.anchor.setTo(0.5,0.5);

					}
				}
		}
	} else {
		//remove old position
		actorMap[actor.y+'_'+actor.x] = null;

		//update position
		actor.y+=dir.y;
		actor.x+=dir.x;

		//add reference to new position
		actorMap[actor.y+'_'+actor.x]= actor;
	}
	return true;
}

function initActors(){
	actorList = [];
	actorMap = {};
	for (var e=0; e<actors; e++){
		//create new actor
		var actor = { x:0, y:0, hp : e== 0 ? 3 : 1 };
		do{
			//pick random position that is on the floor and not occupied
			actor.y = randomInt(rows);
			actor.x = randomInt(columns);

		} while (map[actor.y][actor.x] == '#' || actorMap[actor.y + "_" + actor.x] != null);

		//addrefernces to the actor and actor list and map
		actorMap[actor.y+"_"+actor.x] = actor;
		actorList.push(actor);
	}

	//player is the first actor in the list;
	player = actorList[0];
	livingEnemies = actors - 1;
}

function aiAct(actor) {
	var directions = [{x:-1, y:0},{x:1, y:0},{x:0, y:-1},{x:0, y:1}];
	var dx = player.x - actor.x;
	var dy = player.y - actor.y;

	//if player is far away, walk randomly
	if (Math.abs(dx) + Math.abs(dy) > 6)
		//try to move in a random direction until one works
		while (!moveTo(actor, directions[randomInt(directions.length)])) { };

	//otherwise walk towards player
	if(Math.abs(dx) > Math.abs(dy)) {
		if(dx < 0) {
			//left
			moveTo(actor,directions[0]);
		} else {
			//right
			moveTo(actor, directions[1]);
		}
	}
	else {
		if(dy < 0){
			//up
			moveTo(actor, directions[2]);
		} else {
			//down
			moveTo(actor, directions[3]);
		}
	}
	if(player.hp < 1) {
		//game over
		var gameOver = game.add.text(game.world.centerX, game.world.centerY, 'Game Over\nCtrl+r to restart', { fill : '#e22', align: "center" } );
        gameOver.anchor.setTo(0.5,0.5);
	}
}