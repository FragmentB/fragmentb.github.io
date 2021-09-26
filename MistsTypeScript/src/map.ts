import {tools} from "./tools";
import {lrgMapObj, mapStructure} from "./mapClasses";
import { mapTools} from "./mapTools";

export class mapData{
    structure:mapStructure;
    toolkit = new tools();
    mapToolKit = new mapTools();
    worldMap= new Array<lrgMapObj>();

    constructor()
    {
        this.structure.mapCols=10;
        this.structure.mapRows=10;
        this.structure.tileSize=32;
        this.structure.miniCols=5;
        this.structure.miniRows=5;
    }

    screenWidth():number    { 
        return (this.structure.miniCols * this.structure.tileSize) + 10 + (this.structure.mapCols * this.structure.tileSize);
    }
    screenHeight():number{
        return (this.structure.miniRows * this.structure.tileSize) + (this.structure.mapRows * this.structure.tileSize);
    }
    
    initMap(){
        for (var y = 0; y < this.structure.miniRows; y++){
            for (var x = 0; x < this.structure.miniCols; x++){
                var mapObj = new lrgMapObj(); 
                mapObj.x = x;
                mapObj.y = y;   
                if(Math.random() > 0.8)
                {         
                    var numberOfDoors= this.toolkit.randomInt(5,1);       
                    mapObj.symbol = "#";
                    mapObj.innerMap = this.mapToolKit.generateBuilding(this.structure, numberOfDoors);
                    mapObj.visited = false;
                    mapObj.tileNumber = 34;                      
                }
                else
                {  
                    mapObj.symbol = ".";
                    mapObj.innerMap = this.mapToolKit.generateOutside(this.structure);
                    mapObj.visited = false;
                    mapObj.tileNumber = 33;     
                }
                this.worldMap.push(mapObj);
            }
        }
    } 

    getMiniMapTileArray():Array<Array<number>>
    {
        var miniMapArray = new Array<Array<number>>();;
        for (var y = 0; y < this.structure.miniRows; y++){
            
            var tempArray = new Array<number>();
            for (var x = 0; x < this.structure.miniCols; x++){
                this.worldMap.filter(a=>
                    {                        
                        if(a.y ==y && a.x == x)
                        {
                            tempArray.push(a.tileNumber);
                        }
                    }
                );
            };
            miniMapArray.push(tempArray);
        }

        return miniMapArray;
    }

    getMainMapTileArray(mapNumber:number): Array<Array<number>>
    {
        var map = this.worldMap[mapNumber].innerMap;
        var mapArray = new Array<Array<number>>();;
        for (var y = 0; y < this.structure.mapRows; y++){
            
            var tempArray = new Array<number>();
            for (var x = 0; x < this.structure.mapCols; x++){
                map.filter(a=>
                    {                        
                        if(a.y ==y && a.x == x)
                        {
                            tempArray.push(a.tile.tileNumber);
                        }
                    }
                );
            };
            mapArray.push(tempArray);
        }

        return mapArray;

    }
}


