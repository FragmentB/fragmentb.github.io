import { mapStructure, grass, rubble, box, bush, door, floor, mapTile, nest, tree, wall, water, tile, waterRubble} from "./mapClasses"
import {tools} from "./tools";

export class mapTools{
    toolkit = new tools()

    generateBuilding(map:mapStructure, maxDoors: number): Array<mapTile>
    {
        var area = new Array<mapTile>();
        var doors = 0;
        for (var y = 0; y < map.mapCols; y++){
            for (var x = 0; x < map.mapRows; x++){
                var newTile = new mapTile();
                newTile.x = x;
                newTile.y = y;
                newTile.tile = wall;
                
                if(x == 0 || x == map.mapCols - 1 || y == 0 || y == map.mapRows -1)
                {
                    newTile.tile = grass;
                }
                else if (x == 1|| x == map.mapCols - 2 || y == 1 || y == map.mapRows -2)
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
        
        for (var y=0; y< map.mapRows ;y++) {
            for(var x=0; x< map.mapCols; x++)
            {
                area.forEach(a => {
                    if(a.x == x && a.y == y && a.tile==door)
                    {
                        switch(x){
                            case 1:
                                this.convertTile(area, y, x+1,floor);
                                break;
    
                            case map.mapCols-2:
                                this.convertTile(area, y, x-1, floor);
                                break;
                        }
    
                        switch(y){
                            case 1:
                                this.convertTile(area, y+1, x, floor);
                                break;
    
                            case map.mapRows-2:
                                this.convertTile(area, y-1, y, floor);
                                break;
                        }
                    }
                });
            }
        }
        if(Math.random()>0.85)
            this.generatePuddle(area, map, waterRubble);
        if(Math.random()>0.9)
            this.destroyWall(area, map);
        return area;
    }

    generateOutside(map:mapStructure): Array<mapTile>
    {
        var area = new Array<mapTile>();
        for (var y = 0; y < map.mapRows; y++){
            for (var x = 0; x < map.mapCols; x++){
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
            this.generatePuddle(area, map, water);
            if(Math.random()>0.8)
            {
                this.generatePuddle(area, map, water);
                if(Math.random()>0.7)
                {
                    this.generatePuddle(area, map, water);
                }
            }
        }
        return area;
    }

    generatePuddle(area:Array<mapTile>, map:mapStructure,tile:tile){
        
        var startX = this.toolkit.randomInt(map.mapRows-1, 0);
        var startY = this.toolkit.randomInt(map.mapCols-1, 0);     
        var puddleRows = this.toolkit.randomInt(4,1);
        var puddleCols = this.toolkit.randomInt(4,1);
        var puddle = new Array<mapTile>();
        for(var i=0; i<puddleRows; i++)
        {
            for(var a=0;a<puddleCols;a++)
            {
                if(startX+a < map.mapCols && startY+i < map.mapRows)
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
    
    destroyWall(area:Array<mapTile>, map:mapStructure){
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
                    if(a.x == map.mapCols - 1 && a.tile != grass)
                    {
                        a.tile = rubble;
                        a.tile.tileNumber = this.generateTileNum(a.tile);
                    }
                });
                break;
            case 4 :
                area.filter( a=> {
                    if(a.y == map.mapRows -1 && a.tile != grass)
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
}