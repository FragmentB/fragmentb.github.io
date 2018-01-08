var fontSize = 32;

// player and enemy variables
var mainPlayer;
var initPos;
var bigEnemy;
var escape;

//map structure
var miniRows = 5;
var miniCols = 5;
var mapRows = 10;
var mapCols = 10;
var map;
var bigMap;

//equipment variables
var playerSonar = false;
var playerRadar = false;
var armor = 0;
var maxHP = 10;
var vision = 2;
var enemySize = 1;
var moves = 0;
var movesUntilBigMoves =2;

//display values
var cover;
var health;
var defense;

//screen
var asciidisplay;
var areaAscii;

	var screenWidth = (miniCols * fontSize *0.6) +(mapCols * fontSize);
	var screenHeight = (miniRows * fontSize) + (mapRows * fontSize);
//initalize some stuff
var game = new Phaser.Game(screenWidth, screenHeight, Phaser.AUTO, null, {
	create: create
});

function create() {
	//init keyboard commands
	game.input.keyboard.addCallbacks(null,null,onKeyUp);

	var size = fontSize*.7;
	var style = {font: size+"px monospace", fill:"#fff"};
	//adding text displays for health, defense and cover
	game.add.text((0+size),(screenHeight-(9*size)),"Health:",style);
	health = game.add.text((0+size),(screenHeight-(size*8))," ",style);
	game.add.text((0+size),(screenHeight-(6*size)),"Defense:",style);
	defense = game.add.text((0+size),(screenHeight-(size*5))," ",style);
	game.add.text((0+size),(screenHeight-(3*size)),"Cover:",style);
	cover = game.add.text((0+size),(screenHeight-(size*2))," ",style);


	//map
	initMap();

	//screen
	asciidisplay = [];
	for (var y = 0; y < miniRows; y++){
		var newRow = [];
		asciidisplay.push(newRow);
		for (var x = 0; x < miniCols; x++)
			newRow.push(initCell('', x + .5, y +.5));
	}

	//main screen
	areaAscii =[];
	for(var y = 0; y < mapRows; y++){
		var newRow = [];
		areaAscii.push(newRow);
		for(var x = 0; x < mapCols; x++)
			newRow.push(initBigCell('', x, y +.5, miniCols+2));
	}

	//minimap stuff
	initMiniActors();
	drawMap();
	drawMiniActors();
	scanMap();
	drawMiniFog();

	//mainmap stuff
	drawMainMap();
	drawMainActors();
	drawMainFog();
	dispStats();
}

function initBigCell(chr,x,y, offset){
	//add a single cell in a given position to the ascii display
	var size = fontSize * 1.3;
	var style = {font: size+"px monospace", fill:"#fff"};
	return game.add.text((size*0.6*x) + (offset * 0.6 * fontSize), size*y, chr, style);
}

function initCell(chr,x,y){
	//add a single cell in a given position to the ascii display
	var style = {font: fontSize+"px monospace", fill:"#fff"};
	return game.add.text(fontSize*0.6*x, fontSize*y, chr, style);
}
function dispStats(){
	var cell = ' ';
	for (var i = 0; i < bigMap.length; i++) {
		if(i== mainPlayer.mapPos)
		{
			cell = bigMap[i].map[mainPlayer.y][mainPlayer.x];
			setCover(mainPlayer,cell);
		}
	}
	cover.content=cell+" = "+mainPlayer.cover;
	health.content = mainPlayer.hp +"/"+ maxHP+"HP";
	defense.content = mainPlayer.def +" Armor";
}
function dispCurrentHealth(){
	health.content = mainPlayer.hp + " HP";
}

function setCover(actor, cell)
{
	switch (cell){
		case '*':
			actor.cover = 1;
			break;
		case '%':
			actor.cover = 3;
			break;
		case 'N':
		case 'B':
			actor.cover = 2;
			break;
		case 'D':
			actor.cover = 1;
			break;
		case 'w':
			actor.cover = 4;
			break;
		default:
			actor.cover = 0;
			break;
	}
}
function scanMap()
{
	for (var i = 0; i < bigMap.length; i++) {
		if(i == mainPlayer.mapPos)
			bigMap[i].visited =true;
		if(bigMap[i].visited == true && !
			(i == bigEnemy.mapPos &&(i == mainPlayer.mapPos || playerSonar == true)))
			asciidisplay[bigMap[i].y][bigMap[i].x].font.fill ='#2e2';
		if(!(i == bigEnemy.mapPos) && playerSonar)
			asciidisplay[bigMap[i].y][bigMap[i].x].font.fill = bigMap[i].visited == true ? '#2e2' :'#fff';
			
	}
	if((mainPlayer.mapPos == bigEnemy.mapPos)|| playerSonar == true)
	{
		asciidisplay[bigMap[bigEnemy.mapPos].y][bigMap[bigEnemy.mapPos].x].font.fill = '#e22';
	}
	asciidisplay[bigMap[initPos].y][bigMap[initPos].x].font.fill = '#55f';
	asciidisplay[bigMap[initPos].y][bigMap[initPos].x].content = map[bigMap[initPos].y][bigMap[initPos].x];

	if(initPos == mainPlayer.mapPos)
	{
		asciidisplay[bigMap[initPos].y][bigMap[initPos].x].content = mainPlayer.char;
	}
	if(initPos == bigEnemy.mapPos)
	{
		asciidisplay[bigMap[initPos].y][bigMap[initPos].x].content = '!';


		if(mainPlayer.mapPos == bigEnemy.mapPos)
			asciidisplay[bigMap[initPos].y][bigMap[initPos].x].font.fill = '#e22';
		else	
			asciidisplay[bigMap[initPos].y][bigMap[initPos].x].font.fill = '#ee2';
	}
}

function drawMiniFog()
{
	for (var i = 0; i < bigMap.length; i++) {
		if(playerRadar == false && bigMap[i].visited == false)
				asciidisplay[bigMap[i].y][bigMap[i].x].content = '?';
	}
}

function drawMainFog()
{
	var minX = mainPlayer.x - vision;
	var maxX = mainPlayer.x + vision;
	var minY = mainPlayer.y - vision;
	var maxY = mainPlayer.y + vision;

	for(var y = 0; y < mapCols; y++){
		for (var x = 0; x < mapRows; x++) {
			if(!(minX<=x&&x<=maxX&&minY<=y&&y<=maxY))
				areaAscii[y][x].content='?';
		}
	}
}

function onKeyUp(event){
	drawMap();
	
	switch (event.keyCode) {
		case Phaser.Keyboard.LEFT:
			if(mainMoveTo(mainPlayer, {x:-1, y:0}))
				moves++;
			break;

		case Phaser.Keyboard.RIGHT:
			if(mainMoveTo(mainPlayer, {x:1, y:0}))
				moves++;
			break;
		
		case Phaser.Keyboard.UP:
			if(mainMoveTo(mainPlayer, {x:0, y:-1}));
				moves++;
			break;
		
		case Phaser.Keyboard.DOWN:
			if(mainMoveTo(mainPlayer, {x:0, y:1}))
				moves++;
			break;
		case Phaser.Keyboard.SPACEBAR:
			//attack(mainPlayer, weapon)
			moves++;
			break;
		case Phaser.Keyboard.ESCAPE:
			//back to camp here
			break;
	}
	if(moves >= movesUntilBigMoves || bigEnemy.mapPos == mainPlayer.mapPos)
	{
		aiAct(bigEnemy);
		moves = 0;
	}

	for (var i = 0; i < enemyList.length; i++) {
		if(enemyList[i].mapPos == mainPlayer.mapPos)
		{
			aiAct(enemyList[i]);
		}
	}
	
	drawMiniActors();
	scanMap();
	drawMiniFog();

	drawMainMap();
	drawMainActors();
	drawMainFog();
	dispStats();
}

function drawMap(){
	for (var y = 0; y < miniRows; y++)
		for (var x = 0; x < miniCols; x++)
		{
			asciidisplay[y][x].content = map[y][x];
		}
}

function drawMainMap(){
	for (var i = 0; i < bigMap.length; i++) {
		if(i == mainPlayer.mapPos)
			{
				var mapObj = bigMap[i].map;
				for (var y = 0; y < mapObj.length; y++) {
					for (var x = 0; x < mapObj[y].length; x++) {
						areaAscii[y][x].content = mapObj[y][x];
					}
				}
	}	}
}

function initMap() {
	//create random map
	map=[];
	bigMap=[];
	for (var y = 0; y < miniRows; y++){
		var newRow = [];
		for (var x = 0; x < miniCols; x++){
			if(Math.random() > 0.8)
			{
				newRow.push('#');
				var mapObj = 
					{
						x:0,
						y:0,
						map:generateBuilding(mapRows,mapCols,randomInt(4)+1),
						visited:false
					};

				mapObj.x = x;
				mapObj.y = y;

				bigMap.push(mapObj);
			}
			else
			{
				newRow.push('.');
				var mapObj = 
					{
						x:0,
						y:0,
						map:generateOutside(mapRows,mapCols),
						visited:false
					};

				mapObj.x = x;
				mapObj.y = y;

				bigMap.push(mapObj);
			}
		}
		map.push(newRow);
	}
}

function generateBuilding(rows,cols, maxDoors)
{
	var area = [];
	var doors = 0;
	for (var y = 0; y < rows; y++){
		var newRow = [] ;
		for (var x = 0; x < cols; x++){
			if(x == 0 || x == cols - 1 || y == 0 || y == rows -1)
				newRow.push('.');
			else if (x == 1|| x == cols - 2 || y == 1 || y == rows -2)
				{
					if((x==1 && y==1)|| (x==1 && y==rows-2) ||
					(x==cols-2 && y==1)||(x==cols-2 && y==rows-2))
						newRow.push('#');
					else if (Math.random() > 0.6)
					{

						if(doors < maxDoors )
						{
							doors ++
							newRow.push('D');
						}
						else if(Math.random()>0.8)
							newRow.push('.');
						else
							newRow.push('#');
					}
					else
						newRow.push('#');
				}
			else
			{
				if(Math.random() > 0.3)
					newRow.push('.');
				else if(Math.random() > 0.8)
					newRow.push('B');
				else
					newRow.push('#');
			}
		}
		area.push(newRow);
	}
	for (var y=0; y<area.length ;y++) {
		for(var x=0; x<area[y].length; x++)
		{
			if(area[y][x] == 'D')
			{
				switch(x){
					case 1:
						area[y][x+1] = '.';
						break;

					case area[y].length-2:
						area[y][x-1] = '.';
						break;
				}

				switch(y){
					case 1:
						area[y+1][x] = '.';
						break;

					case area.length-2:
							area[y-1][x] = '.';
						break;
				}
			}
		}
	}
	if(Math.random()>0.85)
		area=generatePuddle(area,rows,cols);
	return area
}

function generateOutside(rows,cols)
{
	var area = [];
	for (var y = 0; y < rows; y++){
		var newRow = [];
		for (var x = 0; x < cols; x++){
			if(Math.random() > 0.9)
				newRow.push('%');
			else if (Math.random() > 0.9)
				newRow.push('*');
			else if (Math.random() > 0.99)
				newRow.push('N');
			else
				newRow.push('.');
		}
		area.push(newRow)
	}	
	if(Math.random()>0.7)
		{
			area=generatePuddle(area,rows,cols);
			if(Math.random()>0.8)
			{
				area=generatePuddle(area,rows,cols);
				if(Math.random()>0.7)
				{
					area=generatePuddle(area,rows,cols);
				}
			}
		}
	return area;
}

function randomInt(max){
	return Math.floor(Math.random() * max);
}
function generatePuddle(area, rows, cols){
	var x = randomInt(rows-2);
	var y = randomInt(cols-2);

	area[y][x] = 'w';
	area[y+1][x] = 'w';
	area[y][x+1] = 'w';
	area[y+1][x+1] = 'w';
	return area;
}
function drawMainActors(){
	for (var i = 0; i < enemyList.length; i++) {
		if(enemyList[i].mapPos == mainPlayer.mapPos)
		{
			var x = enemyList[i].x;
			var y = enemyList[i].y;

			areaAscii[y][x].content = enemyList[i].char;
		}
	}

	if(mainPlayer.mapPos == bigEnemy.mapPos)
	{
		var minX = bigEnemy.x - enemySize;
		var maxX = bigEnemy.x + enemySize;
		var minY = bigEnemy.y - enemySize;
		var maxY = bigEnemy.y + enemySize;

		for(var y = 0; y < mapCols; y++){
			for (var x = 0; x < mapRows; x++) {
				if((minX<=x&&x<=maxX&&minY<=y&&y<=maxY))
					areaAscii[y][x].content= bigEnemy.char;
			}
		}
	}
	if(mainPlayer.mapPos == initPos)
	{
		var x = escape.x;
		var y = escape.y;	
		areaAscii[y][x].content = escape.char;
		areaAscii[y][x].font.fill = '#55f';

	}
	var x = mainPlayer.x;
	var y = mainPlayer.y;
	areaAscii[y][x].content = mainPlayer.char;

}
function causeDamage(target,attacker)
{
	damage = attacker.pow - target.def;
	if(damage < 1)
		damage = 1;
	target.hp -= damage;

	if(attacker == bigEnemy)
	{
		bigEnemy.pause = true;
	}

	if(mainPlayer.hp < 1) {
		//game over
		var gameOver = game.add.text(game.world.centerX, game.world.centerY, 'Game Over\nCtrl+r to restart', { fill : '#e22', align: "center" } );
        gameOver.anchor.setTo(0.5,0.5);
	}
}
function drawMiniActors(){
	var mapPos = mainPlayer.mapPos;
	var x = bigMap[mapPos].x;
	var y = bigMap[mapPos].y;

	asciidisplay[y][x].content = mainPlayer.char;

	mapPos = bigEnemy.mapPos;
	x = bigMap[mapPos].x;
	y = bigMap[mapPos].y;
	
	if(playerSonar == true)
	{
		asciidisplay[y][x].content = bigEnemy.char;
	}

	if(mainPlayer.mapPos == bigEnemy.mapPos)
	{
		asciidisplay[y][x].content = '!';
		asciidisplay[y][x].font.fill = '#e22';
		bigEnemy.hunt = 5;
	}	
}

function miniCanGo(actor, dir){
	var x = bigMap[actor.mapPos].x;
	var y = bigMap[actor.mapPos].y;
	var canGo = false;
	var enemy = false;
	var mapPos = getBigMapPos(y+dir.y,x+dir.x);

	canGo = mapPos>-1 && mapPos<bigMap.length && !(actor==bigEnemy && map[bigMap[mapPos].y][bigMap[mapPos].x] == '#');
	if(canGo == true)
	{
		var xPos = actor.x + dir.x;
			if (xPos < 0)
				xPos = mapCols-1;
			if(xPos > mapCols-1)
				xPos = 0;
		var yPos = actor.y + dir.y;
		if (yPos < 0)
				yPos = mapRows-1;
			if(yPos > mapRows-1)
				yPos = 0;
		cell = bigMap[mapPos].map[yPos][xPos];
		canGo = (cell != '#' && (cell != 'w' || actor.swim == true));

		for (var i = 0; i < enemyList.length; i++) {
			if(enemyList[i].mapPos == i)
			{
				enemy = (enemyList[i].x == xPos && enemyList[i].y);
			}
		}
	}

	if(enemy == true)
		canGo = false;
	return canGo;
}

function mainCanGo(actor,dir){
	var canGo = false;
	var enemy = false;
	if(dir.x !=0)
	{
		var destination = actor.x + dir.x;
		if(destination < 0)
			canGo = miniCanGo(actor,{x:-1, y:0});
		else if(destination > mapCols-1)
			canGo = miniCanGo(actor, {x:1, y:0});
		else{
				for (var i = 0; i < bigMap.length; i++) {
				if(i == actor.mapPos)
				{	var x = actor.x+dir.x;
					var y = actor.y;
					var cell = bigMap[i].map[y][x];
					canGo = (cell != '#' && (cell != 'w' || actor.swim == true));
					if(actor != mainPlayer && actor!= bigEnemy)
					{
						for (var i = 0; i < enemyList.length; i++) {
							if(enemyList[i] != actor && enemyList[i].mapPos == actor.mapPos);
							enemy = ((x == enemyList[i].x && y== enemyList[i].y) || (x == mainPlayer.x && y==mainPlayer.y && enemyList[i].mapPos == mainPlayer.mapPos));
						}
					}
					if(actor == mainPlayer)
					{
						for (var i = 0; i < enemyList.length; i++) {
							enemy = (enemyList[i].mapPos == actor.mapPos && x == enemyList[i].x && y== enemyList[i].y);
						}
					}

				}
			}
		}	
	}
	

	if(dir.y !=0)
	{
		var destination = actor.y + dir.y;
		if(destination < 0)
			canGo = miniCanGo(actor,{x:0, y:-1});
		else if(destination > mapRows-1)
			canGo = miniCanGo(actor, {x:0, y:1});
		else{
				var x = actor.x;
				var y = actor.y+dir.y;
				for (var i = 0; i < bigMap.length; i++) {
				if(i == actor.mapPos)
				{	var cell = bigMap[i].map[y][x];
					canGo = (cell != '#' && (cell != 'w' || actor.swim == true));
					if(actor != mainPlayer && actor!= bigEnemy)
					{
						for (var i = 0; i < enemyList.length; i++) {
							if(enemyList[i] != actor && enemyList[i].mapPos == actor.mapPos);
							enemy = ((x == enemyList[i].x && y== enemyList[i].y) || (x == mainPlayer.x && y==mainPlayer.y && enemyList[i].mapPos == mainPlayer.mapPos));
						}
					}
					if(actor == mainPlayer)
					{
						for (var i = 0; i < enemyList.length; i++) {
							enemy = (enemyList[i].mapPos == actor.mapPos && x == enemyList[i].x && y== enemyList[i].y);
						}
					}
				}
			}
		}	
	}
	
	if(enemy == true)
		canGo = false;
	return canGo;
}
function mainMoveTo(actor,dir){
	if(dir.x<0)
		actor.facing = 'left';
	if(dir.x>0)
		actor.facing = 'right';
	if(dir.y<0)
		actor.facing = 'up';
	if(dir.y>0)
		actor.facing = 'down';

	if(!mainCanGo(actor,dir))
		return false;
	var x = bigMap[actor.mapPos].x;
	var y = bigMap[actor.mapPos].y;

	if(dir.x !=0)
	{
		var destination = actor.x + dir.x;
		if(destination < 0)
		{
			actor.x = mapCols-1;
			actor.mapPos= getBigMapPos(y+dir.y,x+dir.x);
		}
		else if(destination > mapCols-1){
			actor.x = 0;
			actor.mapPos= getBigMapPos(y+dir.y,x+dir.x);
		}
		else
			actor.x+=dir.x;	
	}
	if(dir.y !=0)
	{
		var destination = actor.y + dir.y;
		if(destination < 0)
		{
			actor.y = mapRows-1;
			actor.mapPos= getBigMapPos(y+dir.y,x+dir.x);
		}
		else if(destination > mapCols-1){
			actor.y = 0;
			actor.mapPos= getBigMapPos(y+dir.y,x+dir.x);
		}
		else
			actor.y+=dir.y;
	}

	return true;

}

function miniMoveTo(actor,dir){
	//check to see if the actor can go that way.
	if(!miniCanGo(actor,dir))
		return false;
	//update position
	actor.y+=dir.y;
	actor.x+=dir.x;
	return true;
}
function initPlayer(){
	
	var x = 0;
	var y = 0;
	var top = false;
	var bottom = false;
	var left = false;
	var right = false;

	mainPlayer = { x:0, y:0, hp:maxHP, v:true, hunt:0, pause:false, swim:false, cover:0, pow:0, def:armor, char:'O', facing: null};
	var temp = randomInt(9);
	switch	(temp)
	{
		case 1:
		case 2:
			y =randomInt(miniCols-1);
			break;
		case 3:
		case 4:
			x = miniCols-1;
			y =randomInt(miniCols-1);
			break;
		case 5:
		case 6:
			x = randomInt(miniCols-1);
			break;
		case 7:
		case 8:
		case 9:
			x = randomInt(miniRows-1);
			y = miniRows-1;
			break;
	}		
	
	if(x == 0)
		top = true;
	if(x == miniRows-1)
		bottom = true;
	if(y == 0)
		left = true;
	if(y == miniCols-1)
		right = true;

	if(left == true && top==true)
	{
		if(Math.random()>.5)
			left = false;
		else
			top = false;
	}
	
	if(right == true && top==true)
	{
		if(Math.random()>.5)
			right = false;
		else
			top = false;
	}

	if(left == true && bottom==true)
	{
		if(Math.random()>.5)
			left = false;
		else
			bottom = false;
	}

	if(right == true && bottom==true)
	{
		if(Math.random()>.5)
			right = false;
		else
			bottom = false;
	}

	initPos= getBigMapPos(x,y);
	

	mainPlayer.mapPos = initPos
	for (var i = 0; i < bigMap.length; i++) {
		if(bigMap[i].x == x && bigMap[i].y == y)
		{
			do{
				if(top == true || bottom == true)
					mainPlayer.x = randomInt(mapCols);
				if(left == true || right == true)
					mainPlayer.y = randomInt(mapRows);
				if (bottom == true)
					mainPlayer.y = mapRows-1;
				if(right == true)
					mainPlayer.x = mapCols-1;
			} while(bigMap[i].map[mainPlayer.y][mainPlayer.x] == 'W')
		}
	}
	if(top==true)
		mainPlayer.facing = 'down';
	if(bottom==true)
		mainPlayer.facing = 'up';
	if(left==true)
		mainPlayer.facing = 'right';
	if(right==true)
		mainPlayer.facing = 'left';
	escape = {x:mainPlayer.x,y:mainPlayer.y,char:'V'};
}

function initEnemies()
{
	var indoors = false;
	enemyList = [];
	var maxEnemies = 3;
	for (var i = 0; i < bigMap.length; i++) {
		var enemies = 0;
		if(map[bigMap[i].y][bigMap[i].x] == '#')
			indoors = true;
		else
			indoors = false;

		for (var y = 0; y < bigMap[i].map.length; y++) {
			for (var x = 0; x < bigMap[i].map[y].length; x++) {
				if(bigMap[i].map[y][x] != 'w' && bigMap[i].map[y][x] != '#' && bigMap[i].map[y][x] != 'D'){
					if(enemies< maxEnemies)
					{
						if(Math.random() > 0.98)
						{
							var enemy = generateEnemy(x,y,i,indoors,bigMap[i].map[y][x]);
							enemyList.push(enemy);
							enemies++;
						}
					}	
				}
			}
		}
	}
}

function generateEnemy(x,y,i,indoors,cell)
{ 
	var char = 'H';
	var maxHp = 4;
	var pow = randomInt(2);

	if(indoors==true)
	{
		char = 'Z';
		maxHp = 2;
		pow = randomInt(4);
	}

	var enemy = {x:x,y:y,hp:randomInt(maxHp),v:true,def:1, hunt:0, pow:pow, pause:false,swim:false, cover:0,mapPos:i, char: char, facing: null}
	setCover(enemy,cell);
	return enemy;
}
function initMiniActors(){
	initPlayer();
	initEnemies();
	var x = -1;
	var y = -1;
	var pos = -1;

	do{
		//pick random position that is not a building or in the same spot the player is in
		y = randomInt(miniRows);
		x = randomInt(miniCols);
		pos =  getBigMapPos(y,x);
	} while (map[y][x] == '#' || (mainPlayer.mapPos == pos));

	y = randomInt(mapRows-2) +1;
	x = randomInt(mapCols-2) +1;
	bigEnemy = { x:x, y:y, hp:10, v:playerSonar, pow:5, def: 3, hunt:0, pause:false, swim:true, cover:0, mapPos:pos, char: 'E', facing: null};
}

function getBigMapPos(yPos,xPos)
{
	for (var i = 0; i < bigMap.length; i++) {
		if(bigMap[i].y == yPos && bigMap[i].x == xPos)
			return i;
	}
}

function aiAct(actor) {
	var directions = [{x:-1, y:0},{x:1, y:0},{x:0, y:-1},{x:0, y:1},{x:0, y:0},{x:0, y:0}];
	var dx = 0;
	var dy = 0;

	if(actor.mapPos == mainPlayer.mapPos)
	{
		dx = mainPlayer.x - actor.x;
		dy = mainPlayer.y - actor.y;

	}
	else
	{
		dx = bigMap[mainPlayer.mapPos].x - bigMap[actor.mapPos].x;
		dy = bigMap[mainPlayer.mapPos].y - bigMap[actor.mapPos].y;
	}	
	if(actor.hunt == 0)
		//try to move in a random direction until one works
		while (!mainMoveTo(actor, directions[randomInt(directions.length)]));
	else
	{
		actor.hunt--;
		if(actor.pause == false)
		{
			//otherwise walk towards player
			if(Math.abs(dx) > Math.abs(dy)) {
				if(dx < 0) {
					//left
					mainMoveTo(actor,directions[0]);
				} else if (dx > 0) {
					//right
					mainMoveTo(actor, directions[1]);
				}
			}
			else {
				if(dy < 0 && mainCanGo(actor,directions[2])){
					//up
					mainMoveTo(actor, directions[2]);
				} else if (dy > 0 && mainCanGo(actor,directions[3])){
					//down
					mainMoveTo(actor, directions[3]);
				}
				else if(dx < 0 && mainCanGo(actor,directions[0])) {
					//left
					mainMoveTo(actor,directions[0]);
				} else if (dx > 0 && mainCanGo(actor,directions[1])) {
					//right
					mainMoveTo(actor, directions[1]);
				}
			}
		}
		else
		{
			actor.pause = false;
		}
	}	
}