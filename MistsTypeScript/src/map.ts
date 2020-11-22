import {tools} from "./tools"
export class mapData{

    //map structure
    readonly miniRows = 5;
    readonly miniCols = 5;
    readonly mapRows = 10;
    readonly mapCols = 10;
    readonly tileSize = 32;
    toolkit = new tools();
    
    bigMap= new Array<Array<lrgMapObj>>();

    screenWidth():number    { 
        return (this.miniCols * this.tileSize *0.6) + (this.mapCols * this.tileSize);
    }
    screenHeight():number{
        return (this.miniRows * this.tileSize) + (this.mapRows * this.tileSize);
    }
    
    initMap(){
        for (var y = 0; y < this.miniRows; y++){
            var newRow = new Array<lrgMapObj>();
            for (var x = 0; x < this.miniCols; x++){
                var mapObj = new lrgMapObj();   
                if(Math.random() > 0.8)
                {                    
                    mapObj= 
                    {
                        symbol: "#",
                        innerMap:generateBuilding(this.mapRows,this.mapCols, this.toolkit.randomInt(4,null)+1),
                        visited:false,
                        image:""
                    }; 

                    
                      
                }
                else
                {       
                    var map = generateOutside(this.mapRows,this.mapCols); 
                    if(Math.random()>0.7)
                    {
                        map = generatePuddle(map,this.mapRows,this.mapCols);
                        if(Math.random()>0.8)
                        {
                            map = generatePuddle(map,this.mapRows,this.mapCols);
                            if(Math.random()>0.7)
                            {
                                map = generatePuddle(map,this.mapRows,this.mapCols);
                            }
                        }
                    }

                    mapObj= 
                    {
                        symbol:".",
                        innerMap:map,
                        visited:false,
                        image:""
                    }; 
                }
                newRow.push(mapObj);
            }
            this.bigMap.push(newRow);
        }
    }
}

function generateBuilding(rows,cols, maxDoors): Array<Array<tile>>
{
	var area = new Array<Array<tile>>();
	var doors = 0;
	for (var y = 0; y < rows; y++){
		var newRow = new Array<tile>();
		for (var x = 0; x < cols; x++){
            var newTile = new tile()
            newTile.passable = false;
            newTile.swimmable = false;
            newTile.cover = 0;
            newTile.symbol = "#";
            newTile.name = "Wall";
            newTile.image="";
            
            if(x == 0 || x == cols - 1 || y == 0 || y == rows -1)
            {
                newTile.cover = 0;
                newTile.symbol = ".";
                newTile.name = "Grass";
                newTile.image="";
                newTile.passable = true;
            }
			else if (x == 1|| x == cols - 2 || y == 1 || y == rows -2)
            {
                //if the edge of a building
                if (Math.random() > 0.6)
                {
                    //add doors
                    if(doors < maxDoors )
                    {
                        doors ++
                        newTile.cover = 1;
                        newTile.symbol = "D";
                        newTile.name = "Door";
                        newTile.image="";
                        newTile.passable = true;
                    }
                    //Chance for hole in the wall
                    else if(Math.random()>0.8)
                    {
                        newTile.cover = 0;
                        newTile.symbol = "^";
                        newTile.name = "Rubble";
                        newTile.image="";
                        newTile.passable = true;
                    }
                }
            }
			else
			{
				if(Math.random() > 0.3)
                {
                    //most the building should be floor
                    newTile.cover = 0;
                    newTile.symbol = "-";
                    newTile.name = "floor";
                    newTile.image="";
                    newTile.passable = true;
                }
                else if(Math.random() > 0.8)
                {
                    newTile.cover = 2;
                    newTile.symbol = "B";
                    newTile.name = "Box";
                    newTile.image="";
                    newTile.passable = true;
                }
            }
            newRow.push(newTile);
		}
		area.push(newRow);
	}
	for (var y=0; y<area.length ;y++) {
		for(var x=0; x<area[y].length; x++)
		{
			if(area[y][x].symbol == 'D')
			{
				switch(x){
					case 1:
						area[y][x+1] = convertTileToFloor(area[y][x+1]);
						break;

					case area[y].length-2:
						area[y][x-1] = convertTileToFloor(area[y][x-1]);
						break;
				}

				switch(y){
					case 1:
						area[y+1][x]=convertTileToFloor(area[y+1][x]);
						break;

					case area.length-2:
                        area[y-1][x]=convertTileToFloor(area[y-1][x]);
						break;
				}
			}
		}
	}
	if(Math.random()>0.85)
        generatePuddle(area,rows,cols);
	return area;
}

function generateOutside(rows,cols): Array<Array<tile>>
{
    var area = new Array<Array<tile>>();
	for (var y = 0; y < rows; y++){
		var newRow = new Array<tile>();
		for (var x = 0; x < cols; x++){
            var newTile = new tile()
            newTile.passable = true;
            newTile.swimmable = false;
            
            if(Math.random() > 0.9)
            {
                newTile.cover = 3;
                newTile.symbol = "%";
                newTile.name = "Tree";
                newTile.image="";
            }
            else if (Math.random() > 0.9)
            {
                newTile.cover = 1;
                newTile.symbol = "*";
                newTile.name = "Bush";
                newTile.image="";
            }
            else if (Math.random() > 0.99)
            {
                newTile.cover = 2;
                newTile.symbol = "N";
                newTile.name = "Nest";
                newTile.image="";
            }
            else
            {
                newTile.cover = 0;
                newTile.symbol = ".";
                newTile.name = "Grass";
                newTile.image="";
            }           
            newRow.push(newTile);
		}
		area.push(newRow)
	}	
	
	return area;
}

function generatePuddle(area:Array<Array<tile>>, rows, cols):Array<Array<tile>>{

    var toolkit = new tools()
    var x = toolkit.randomInt(rows-2, 0);
    var y = toolkit.randomInt(cols-2, 0);
    
    
    area[y][x] = convertTileToWater(area[y][x]);
    area[y+1][x] = convertTileToWater(area[y+1][x]);
    area[y][x+1] = convertTileToWater(area[y][x+1]);
    area[y+1][x+1] = convertTileToWater(area[y+1][x+1]);
    return area;
}




function convertTileToWater(tile:tile):tile
{
    tile.cover = 4;
    tile.image = "";
    tile.swimmable = true;
    tile.symbol = 'w';
    return tile;
}

function convertTileToFloor(tile:tile):tile
{
    tile.cover = 0;
    tile.image = "";
    tile.passable = true;
    tile.symbol = '-';

    return tile;
}

class lrgMapObj {
    symbol:string;
    innerMap:Array<Array<tile>>;
    visited:boolean;
    image:string;
}

class tile {
    symbol: string;
    passable: boolean;
    swimmable: boolean;
    image: string;
    cover: number;
    name: string;
}
