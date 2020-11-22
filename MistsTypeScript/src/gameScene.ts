import "phaser";
import { mapData } from "./map"
export class GameScene extends Phaser.Scene{

    map: mapData;

    constructor(){
        super({
            key: "GameScene"
        });
    }

    init(params): void{
        this.map = new mapData();
    }
    
    preload():void{
        //TODO
    }

    create():void{
        this.map.initMap();
    }

    update(time):void{
        //TODO
    }
}