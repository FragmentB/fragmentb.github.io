import "phaser";
import { mapData } from "./map"
import { Screen } from "./screen"
export class GameScene extends Phaser.Scene{

    map: mapData;
    screen: Screen;

    constructor(){
        super({
            key: "GameScene"
        });
    }

    init(params): void{
        this.map = new mapData();
        this.screen = new Screen();
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