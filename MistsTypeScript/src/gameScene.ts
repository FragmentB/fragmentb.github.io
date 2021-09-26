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
        this.load.image("tiles","src/images/simpleTiles.png");
    }

    create():void{
        this.map.initMap();

        console.log(this.map.getMiniMapTileArray());
        const tileMap = this.make.tilemap({data:this.map.getMiniMapTileArray(), tileHeight:16, tileWidth:16, key:'MiniMap'});
        tileMap.addTilesetImage("tiles");
 
        var fontSize = 32;
        var size = fontSize*.7;
        var style = {font: size+"px monospace", fill:"#fff"};
        var defaultInfo = "Welcome to the Mists";
        var screenHeight = Number(this.game.config.height);
        this.add.tilemap('MiniMap');
        //adding text displays for health, defense and cover
        this.add.text((0+size),(screenHeight-(12*size)),"Weapon:",style);
        var dispWeapon =this.add.text((0+size),(screenHeight-(size*11)),"",style);
        this.add.text((0+size),(screenHeight-(9*size)),"Health:",style);
        var health = this.add.text((0+size),(screenHeight-(size*8))," ",style);
        this.add.text((0+size),(screenHeight-(6*size)),"Defense:",style);
        var defense = this.add.text((0+size),(screenHeight-(size*5))," ",style);
        this.add.text((0+size),(screenHeight-(3*size)),"Cover:",style);
        var cover = this.add.text((0+size),(screenHeight-(size*2))," ",style);
        var info = this.add.text(((this.map.miniCols+2 * fontSize * 1.8)+size),(screenHeight-(size*2)),defaultInfo,style);
        
    }

    update(time):void{
        //TODO
    }


    drawMap():void{
        
    }
}