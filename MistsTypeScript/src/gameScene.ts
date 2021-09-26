import "phaser";
import { mapData } from "./map"
import { settings } from "./gameSettings";
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
    }
    
    preload():void{
        this.load.image("tiles","src/Images/simpleTiles.png");
    }

    create():void{
        this.map.initMap();

        const miniMap = this.make.tilemap({data:this.map.getMiniMapTileArray(), tileHeight:settings.tilesetSize, tileWidth:settings.tilesetSize});
        miniMap.addTilesetImage('tiles');

        const bigMap = this.make.tilemap({data:this.map.getMainMapTileArray(0), tileHeight:settings.tilesetSize, tileWidth:settings.tilesetSize});
        bigMap.addTilesetImage('tiles');
         
        var fontSize = 32;
        var size = fontSize*.7;
        var scale = settings.tileSize/settings.tilesetSize;

        var style = {font: size+"px monospace", fill:"#fff"};
        var defaultInfo = "Welcome to the Mists";
        var screenHeight = Number(this.game.config.height);
        
        const miniMapBottom = miniMap.createLayer(0,'tiles',settings.padding,settings.padding);
        miniMapBottom.setScale(scale,scale);

        const bigMapBottom = bigMap.createLayer(0,'tiles', (settings.miniCols * settings.tileSize) + (settings.padding * 2), settings.padding);
        bigMapBottom.setScale(scale,scale);

        //adding text displays for health, defense and cover
        this.add.text((0+size),(screenHeight-(12*size)),"Weapon:",style);
        var dispWeapon =this.add.text((0+size),(screenHeight-(size*11)),"",style);
        this.add.text((0+size),(screenHeight-(9*size)),"Health:",style);
        var health = this.add.text((0+size),(screenHeight-(size*8))," ",style);
        this.add.text((0+size),(screenHeight-(6*size)),"Defense:",style);
        var defense = this.add.text((0+size),(screenHeight-(size*5))," ",style);
        this.add.text((0+size),(screenHeight-(3*size)),"Cover:",style);
        var cover = this.add.text((0+size),(screenHeight-(size*2))," ",style);
        var info = this.add.text(((settings.miniCols+2 * fontSize * 1.8)+size),(screenHeight-(size*2)),defaultInfo,style);
        
    }

    update(time):void{
        //TODO
    }


    drawMap():void{
        
    }
}