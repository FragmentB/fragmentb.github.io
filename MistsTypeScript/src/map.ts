import {tools} from "./tools";
import {lrgMapObj, grass, rubble, box, bush, door, floor, mapTile, nest, tree, wall, water, tile, waterRubble} from "./mapClasses";
export class mapData{

    //map structure
    readonly miniRows = 5;
    readonly miniCols = 5;
    readonly mapRows = 10;
    readonly mapCols = 10;
    readonly tileSize = 32;
    toolkit = new tools();
    worldMap= new Array<lrgMapObj>();

    screenWidth():number    { 
        return (this.miniCols * this.tileSize *0.6) + (this.mapCols * this.tileSize);
    }
    screenHeight():number{
        return (this.miniRows * this.tileSize) + (this.mapRows * this.tileSize);
    }
    
    initMap(){
        for (var y = 0; y < this.miniRows; y++){
            for (var x = 0; x < this.miniCols; x++){
                var mapObj = new lrgMapObj(); 
                mapObj.x = x;
                mapObj.y = y;   
                if(Math.random() > 0.8)
                {         
                    var numberOfDoors= this.toolkit.randomInt(5,1);       
                    mapObj.symbol = "#";
                    mapObj.innerMap = this.generateBuilding(this.mapRows,this.mapCols, numberOfDoors);
                    mapObj.visited = false;
                    mapObj.tileNumber = 34;                      
                }
                else
                {  
                    mapObj.symbol = ".";
                    mapObj.innerMap = this.generateOutside(this.mapRows,this.mapCols)
                    mapObj.visited = false;
                    mapObj.tileNumber = 33;     
                }
            }
            this.worldMap.push(mapObj);
        }
    }

    generateBuilding(rows,cols, maxDoors): Array<mapTile>
    {
        var area = new Array<mapTile>();
        var doors = 0;
        for (var y = 0; y < rows; y++){
            for (var x = 0; x < cols; x++){
                var newTile = new mapTile();
                newTile.x = x;
                newTile.y = y;
                newTile.tile = wall;
                
                if(x == 0 || x == cols - 1 || y == 0 || y == rows -1)
                {
                    newTile.tile = grass;
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
                            newTile.tile = door;
                        }
                        //Chance for hole in the wall
                        else if(Math.random()>0.8)
                            newTile.tile = rubble;
                    }
                }
                else
                {
                    if(Math.random() > 0.3)
                        newTile.tile = floor;
                    else if(Math.random() > 0.8)
                        newTile.tile = box;                        
                }

                newTile.tile.tileNumber = this.generateTileNum(newTile.tile);

                area.push(newTile);
            }
        }
        
        for (var y=0; y< rows ;y++) {
            for(var x=0; x< cols; x++)
            {
                area.forEach(a => {
                    if(a.x == x && a.y == y && a.tile==door)
                    {
                        switch(x){
                            case 1:
                                this.convertTile(area, y, x+1,floor);
                                break;
    
                            case cols-2:
                                this.convertTile(area, y, x-1, floor);
                                break;
                        }
    
                        switch(y){
                            case 1:
                                this.convertTile(area, y+1, x, floor);
                                break;
    
                            case rows.length-2:
                                this.convertTile(area, y-1, y, floor);
                                break;
                        }
                    }
                });
            }
        }
        if(Math.random()>0.85)
            this.generatePuddle(area, rows, cols, waterRubble);
        if(Math.random()>0.9)
            this.destroyWall(area);
        return area;
    }

    generateOutside(rows,cols): Array<mapTile>
    {
        var area = new Array<mapTile>();
        for (var y = 0; y < rows; y++){
            for (var x = 0; x < cols; x++){
                var newTile = new mapTile()
                newTile.x = x;
                newTile.y = y;
                                
                if(Math.random() > 0.9)
                    newTile.tile = tree;
                else if (Math.random() > 0.9)
                    newTile.tile = bush;
                else if (Math.random() > 0.99)
                    newTile.tile = nest;
                else
                    newTile.tile = grass;

                newTile.tile.tileNumber = this.generateTileNum(newTile.tile);
                area.push(newTile)
            }
        }	
        if(Math.random()>0.7){
            this.generatePuddle(area, this.mapRows, this.mapCols, water);
            if(Math.random()>0.8)
            {
                this.generatePuddle(area, this.mapRows, this.mapCols, water);
                if(Math.random()>0.7)
                {
                    this.generatePuddle(area, this.mapRows, this.mapCols, water);
                }
            }
        }
        return area;
    }

    generatePuddle(area:Array<mapTile>, rows, cols, tile:tile){
        var toolkit = new tools()
        var startX = toolkit.randomInt(rows-1, 0);
        var startY = toolkit.randomInt(cols-1, 0);     
        var puddleRows = toolkit.randomInt(4,1);
        var puddleCols = toolkit.randomInt(4,1);
        var puddle = new Array<mapTile>();
        for(var i=0; i<puddleRows; i++)
        {
            for(var a=0;a<puddleCols;a++)
            {
                if(startX+a < this.mapCols && startY+i < this.mapRows)
                {
                    var puddleTile = new mapTile();
                    puddleTile.tile = tile;
                    puddleTile.x = startX+a;
                    puddleTile.y = startY+i;
                    puddle.push(puddleTile)
                }
            }
        }
        puddle.forEach(p => {
            area.filter( a=> {
                if(a.x == p.x && a.y ==p.y)
                {
                    a.tile = tile;
                    a.tile.tileNumber = this.generateTileNum(tile);
                }
            });
        });            
    } 
    
    destroyWall(area:Array<mapTile>){
        var wallToDestroy = this.toolkit.randomInt(4,1);
        switch(wallToDestroy)
        {
            case 1 :
                area.filter( a=> {
                    if(a.x == 0 && a.tile != grass)
                    {
                        a.tile = rubble;
                        a.tile.tileNumber = this.generateTileNum(a.tile);
                    }
                });
                break;
            case 2 :
                area.filter( a=> {
                    if(a.y == 0 && a.tile != grass)
                    {
                        a.tile = rubble;
                        a.tile.tileNumber = this.generateTileNum(a.tile);
                    }
                });
                break;
            case 3 :
                area.filter( a=> {
                    if(a.x == this.mapCols - 1 && a.tile != grass)
                    {
                        a.tile = rubble;
                        a.tile.tileNumber = this.generateTileNum(a.tile);
                    }
                });
                break;
            case 4 :
                area.filter( a=> {
                    if(a.y == this.mapRows -1 && a.tile != grass)
                    {
                        a.tile = rubble;
                        a.tile.tileNumber = this.generateTileNum(a.tile);
                    }
                });
                break;
        }
    }

    convertTile(area:Array<mapTile>, x:number,y:number, tile: tile){
        area.filter( a=> {
            if(a.x == x && a.y ==y)
            {
                a.tile = tile;
                a.tile.tileNumber = this.generateTileNum(a.tile);
            }
        });
    }

    generateTileNum(tile:tile): number
    {
        var min = tile.tileRow * 3;
        var max = min + 2 ;
        return Math.floor(Math.random() * (max - min + 1) + min)
    }

    getMiniMapTileArray():Array<Array<number>>
    {
        var miniMapArray = new Array<Array<number>>();

        for (var y = 0; y < this.miniRows; y++){
            var tempArray = new Array<number>();
            for (var x = 0; x < this.miniCols; x++){
                this.worldMap.filter( a=>
                    {
                        if(a.x == x && a.y ==y)
                        {
                            tempArray.push(a.tileNumber);
                            console.log(x,y,a.tileNumber);
                        }
                    }
                );
            };
            
            miniMapArray.push(tempArray);
        }

        return miniMapArray
    }
}
