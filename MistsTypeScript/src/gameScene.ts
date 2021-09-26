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
         
        
        var scale = settings.tileSize/settings.tilesetSize;

        var style = {font: settings.fontSize+"px monospace", fill:"#fff"};
        var defaultInfo = "Welcome to the Mists";
        var screenHeight = Number(this.game.config.height);
        var miniMapWidth = settings.miniCols * settings.tileSize

        const miniMapBottom = miniMap.createLayer(0,'tiles',settings.padding,settings.padding);
        miniMapBottom.setScale(scale,scale);

        const bigMapBottom = bigMap.createLayer(0,'tiles', (miniMapWidth + (settings.padding * 2)), settings.padding);
        bigMapBottom.setScale(scale,scale);

        //adding text displays for health, defense and cover
        this.add.text(settings.padding, this.getNextTextHeightPosition(1),"Weapon:",style);
        var dispWeapon = this.add.text(settings.padding, this.getNextTextHeightPosition(2),"",style);
        this.add.text(settings.padding, this.getNextTextHeightPosition(3),"Health:",style);
        var health = this.add.text(settings.padding, this.getNextTextHeightPosition(4),"",style);
        this.add.text(settings.padding, this.getNextTextHeightPosition(5),"Defense",style);
        var defense = this.add.text(settings.padding, this.getNextTextHeightPosition(6),"",style);
        this.add.text(settings.padding, this.getNextTextHeightPosition(7),"Cover",style);
        var cover = this.add.text(settings.padding, this.getNextTextHeightPosition(8),"",style);
        var info = this.add.text(settings.padding, this.getNextTextHeightPosition(9),defaultInfo,style);
        
    }

    update(time):void{
        //TODO
    }


    drawMap():void{
        
    }

    getNextTextHeightPosition(factor:number):number{
        var miniMapHeight = settings.miniRows * settings.tileSize
        var padding = settings.padding * factor;
        var currentHeight = settings.fontSize * factor;
        var height = miniMapHeight + padding + currentHeight;

        return height;
    }
}