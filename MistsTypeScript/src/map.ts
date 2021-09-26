import {tools} from "./tools";
import {lrgMapObj} from "./mapClasses";
import { mapTools} from "./mapTools";
import { settings } from "./gameSettings";

export class mapData{
    toolkit = new tools();
    mapToolKit = new mapTools();
    worldMap= new Array<lrgMapObj>();
      
    initMap(){
        for (var y = 0; y < settings.miniRows; y++){
            for (var x = 0; x < settings.miniCols; x++){
                var mapObj = new lrgMapObj(); 
                mapObj.x = x;
                mapObj.y = y;   
                if(Math.random() > 0.8)
                {         
                    var numberOfDoors= this.toolkit.randomInt(5,1);       
                    mapObj.symbol = "#";
                    mapObj.innerMap = this.mapToolKit.generateBuilding(numberOfDoors);
                    mapObj.visited = false;
                    mapObj.tileNumber = 34;                      
                }
                else
                {  
                    mapObj.symbol = ".";
                    mapObj.innerMap = this.mapToolKit.generateOutside(x==0,x==settings.miniCols-1,y==0,y==settings.miniRows);
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
        for (var y = 0; y < settings.miniRows; y++){
            
            var tempArray = new Array<number>();
            for (var x = 0; x < settings.miniCols; x++){
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

    getMapNumber(x:number,y:number)
    {
        return this.worldMap.findIndex( a=> a.x==x && a.y==y);
    }

    getMainMapTileArray(mapNumber:number): Array<Array<number>>
    {
        var map = this.worldMap[mapNumber].innerMap;
        var mapArray = new Array<Array<number>>();;
        for (var y = 0; y < settings.mapRows; y++){
            
            var tempArray = new Array<number>();
            for (var x = 0; x < settings.mapCols; x++){
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


