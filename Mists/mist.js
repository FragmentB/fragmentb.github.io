var fontSize = 32;

// player and enemy variables
var miniPlayer;
var mainPlayer;
var initMiniPos;
var miniEnemy;

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
var vision = 2;
var moves = 0;
var movesUntilBigMoves = 10;
var cover;

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
	//game.add.text((size*0.6*x) + (offset * 0.6 * fontSize), size*y, chr, style);
	game.add.text((0+size),(screenHeight-(3*size)),"Cover:",style)
	cover = game.add.text((0+size),(screenHeight-(size*2))," ",style)


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
	dispCurrentCover();
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
function dispCurrentCover(){
	var cell = ' ';
	for (var i = 0; i < bigMap.length; i++) {
		if(bigMap[i].y == miniPlayer.y && bigMap[i].x == miniPlayer.x)
		{
			cell = bigMap[i].map[mainPlayer.y][mainPlayer.x];
			setCover(miniPlayer,cell);
		}
	}
	cover.content=cell+" = "+miniPlayer.cover;
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

		if(bigMap[i].x == miniPlayer.x && bigMap[i].y == miniPlayer.y)
			bigMap[i].visited =true;
		if(bigMap[i].visited == true && !
			(bigMap[i].x == miniEnemy.x && bigMap[i].y == miniEnemy.y && 
				((miniPlayer.x == miniEnemy.x && miniPlayer.y == miniEnemy.y)
					|| playerSonar == true)))
			asciidisplay[bigMap[i].y][bigMap[i].x].font.fill ='#2e2';
		if(!(bigMap[i].x == miniEnemy.x && bigMap[i].y == miniEnemy.y) && playerSonar)
				asciidisplay[bigMap[i].y][bigMap[i].x].font.fill = bigMap[i].visited == true ? '#2e2' :'#fff';
			
	}
	if((miniPlayer.x == miniEnemy.x && miniPlayer.y == miniEnemy.y)|| playerSonar == true)
	{
		asciidisplay[miniEnemy.y][miniEnemy.x].font.fill = '#e22';
	}
	asciidisplay[initMiniPos.y][initMiniPos.x].font.fill = '#55f';
	asciidisplay[initMiniPos.y][initMiniPos.x].content = map[initMiniPos.y][initMiniPos.x];

	if(initMiniPos.x == miniPlayer.x && initMiniPos.y==miniPlayer.y)
	{
		asciidisplay[initMiniPos.y][initMiniPos.x].content = 'O';
	}
	if(initMiniPos.x == miniEnemy.x && initMiniPos.y==miniEnemy.y)
	{
		asciidisplay[initMiniPos.y][initMiniPos.x].content = '!';
		if(miniPlayer.x == miniEnemy.x && miniPlayer.y == miniEnemy.y)
			asciidisplay[initMiniPos.y][initMiniPos.x].font.fill = '#e22';
		else	
			asciidisplay[initMiniPos.y][initMiniPos.x].font.fill = '#ee2';
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
	
	var acted = false;
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
			acted = true;
			break;
	}
	if(moves >= movesUntilBigMoves && (!(miniPlayer.x ==miniEnemy.x && miniPlayer.y==miniEnemy.y)))
	{
		aiAct(miniEnemy);
		moves = 0;
	}
	
	drawMiniActors();
	scanMap();
	drawMiniFog();

	drawMainMap();
	drawMainActors();
	drawMainFog();
	dispCurrentCover();
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
		if(bigMap[i].x == miniPlayer.x && bigMap[i].y== miniPlayer.y)
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
	var x = mainPlayer.x;
	var y = mainPlayer.y;

	areaAscii[y][x].content = 'O';

}

function drawMiniActors(){
	var x = miniPlayer.x;
	var y = miniPlayer.y;

	asciidisplay[y][x].content = 'O';

	x = miniEnemy.x;
	y = miniEnemy.y;
	if(playerSonar == true)
	{
		asciidisplay[y][x].content = 'X';
	}

	if(miniPlayer.x == miniEnemy.x && miniPlayer.y == miniEnemy.y)
	{
		asciidisplay[y][x].content = '!';
		asciidisplay[y][x].font.fill = '#e22';
		miniEnemy.hunt = 5;
		//miniEnemy.pause = true;
	}	
}

function miniCanGo(actor, dir){
	return actor.x+dir.x >= 0 &&
		   actor.x+dir.x <= miniCols - 1 &&
		   actor.y+dir.y >= 0 &&
		   actor.y+dir.y <= miniRows - 1 &&
		   (actor==miniPlayer || map[actor.y+dir.y][actor.x+dir.x] == '.');
}

function mainCanGo(actor,dir){
	var canGo = false;
	if(dir.x !=0)
	{
		var destination = actor.x + dir.x;
		if(destination < 0)
			canGo = miniCanGo(miniPlayer,{x:-1, y:0});
		else if(destination > mapCols-1)
			canGo = miniCanGo(miniPlayer, {x:1, y:0});
		else{
				for (var i = 0; i < bigMap.length; i++) {
				if(bigMap[i].x == miniPlayer.x && bigMap[i].y == miniPlayer.y)
				{	var cell = bigMap[i].map[actor.y][actor.x+dir.x];
					canGo =  (cell != '#' && (cell != 'w' || actor.swim == true));
				}
			}
		}	
	}
	

	if(dir.y !=0)
	{
		var destination = actor.y + dir.y;
		if(destination < 0)
			canGo = miniCanGo(miniPlayer,{x:0, y:-1});
		else if(destination > mapRows-1)
			canGo = miniCanGo(miniPlayer, {x:0, y:1});
		else{
				for (var i = 0; i < bigMap.length; i++) {
				if(bigMap[i].x == miniPlayer.x && bigMap[i].y == miniPlayer.y)
				{	var cell = bigMap[i].map[actor.y+dir.y][actor.x];
					canGo = (cell != '#' && (cell != 'w' || actor.swim == true));
				}
			}
		}	
	}
	
	return canGo;
}
function mainMoveTo(actor,dir){
	if(!mainCanGo(actor,dir))
		return false;

	if(dir.x !=0)
	{
		var destination = actor.x + dir.x;
		if(destination < 0)
		{
			actor.x = mapCols-1;
			miniMoveTo(miniPlayer, dir);
		}
		else if(destination > mapCols-1){
			actor.x = 0;
			miniMoveTo(miniPlayer, dir);
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
			miniMoveTo(miniPlayer, dir);
		}
		else if(destination > mapCols-1){
			actor.y = 0;
			miniMoveTo(miniPlayer, dir);
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
	//create miniMapPlayer
	miniPlayer = { x:0, y:0, hp:4, v:true, hunt:0, pause:false, swim:false, cover:0};
	mainPlayer = { x:0, y:0, hp:4, v:true, hunt:0, pause:false, swim:false, cover:0};
	switch	(randomInt(9))
	{
		case 1:
		case 2:
			miniPlayer.y =randomInt(miniCols-1);
			break;
		case 3:
		case 4:
			miniPlayer.x = miniRows-1;
			miniPlayer.y =randomInt(miniCols-1);
			break;
		case 5:
		case 6:
			miniPlayer.x = randomInt(miniRows-1);
			break;
		case 7:
		case 8:
		case 9:
			miniPlayer.x = randomInt(miniRows-1);
			miniPlayer.y = miniCols-1;
			break;
	}
	var x = miniPlayer.x;
	var y = miniPlayer.y;
	
	var top = false;
	var bottom = false;
	var left = false;
	var right = false;
	if(y == 0)
		top = true;
	if(y == miniRows-1)
		bottom = true;
	if(x == 0)
		left = true;
	if(x == miniCols-1)
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

	initMiniPos= {x:miniPlayer.x, y: miniPlayer.y};
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
}

function initMiniActors(){
	initPlayer();
	miniEnemy = { x:0, y:0, hp:1, v:playerSonar, hunt:0, pause:false, swim:false, cover:0};
	do{
		//pick random position that is on the floor and not occupied
		var y = randomInt(miniRows);
		var x = randomInt(miniCols);
		miniEnemy.x = x;
		miniEnemy.y = y;
	} while (map[y][x] == '#' || (miniPlayer.x == x && miniPlayer.y == y));
}

function aiAct(actor) {
	var directions = [{x:-1, y:0},{x:1, y:0},{x:0, y:-1},{x:0, y:1},{x:0, y:0},{x:0, y:0}];
	var dx = miniPlayer.x - actor.x;
	var dy = miniPlayer.y - actor.y;

	if(actor.hunt == 0)
		//try to move in a random direction until one works
		while (!miniMoveTo(actor, directions[randomInt(directions.length)]));
	else
	{
		actor.hunt--;
		if(actor.pause == false)
		{
			//otherwise walk towards player
			if(Math.abs(dx) > Math.abs(dy)) {
				if(dx < 0) {
					//left
					miniMoveTo(actor,directions[0]);
				} else if (dx > 0) {
					//right
					miniMoveTo(actor, directions[1]);
				}
			}
			else {
				if(dy < 0 && miniCanGo(actor,directions[2])){
					//up
					miniMoveTo(actor, directions[2]);
				} else if (dy > 0 && miniCanGo(actor,directions[3])){
					//down
					miniMoveTo(actor, directions[3]);
				}
				else if(dx < 0 && miniCanGo(actor,directions[0])) {
					//left
					miniMoveTo(actor,directions[0]);
				} else if (dx > 0 && miniCanGo(actor,directions[1])) {
					//right
					miniMoveTo(actor, directions[1]);
				}
			}
		}
		else
		{
			actor.pause = false;
		}
	}	
}