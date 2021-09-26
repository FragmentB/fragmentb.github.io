import "phaser";
import { mapData } from "./map"
import { settings } from "./gameSettings";
import { stick } from "./playerWeapons";
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
        this.load.image("playa","src/Images/tempPlayer.png");
        this.load.image("displayPlate","src/Images/tempPlate.png");
        this.load.image("stick", stick.image);
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
        var fontPaddingLeft = settings.padding * 2;
        var miniMapWidth = settings.miniCols * settings.tileSize
        

        const miniMapBottom = miniMap.createLayer(0,'tiles',settings.padding,settings.padding);
        miniMapBottom.setScale(scale,scale);

        const bigMapBottom = bigMap.createLayer(0,'tiles', (miniMapWidth + (settings.padding * 2)), settings.padding);
        bigMapBottom.setScale(scale,scale);

        var miniPlaya = this.add.image(settings.padding,settings.padding,"playa");
        miniPlaya.setScale(scale,scale);
        miniPlaya.setOrigin(0,0); 
        
        var mainPlaya = this.add.image(miniMapWidth + (settings.padding * 2),settings.padding,"playa");
        mainPlaya.setScale(scale,scale);
        mainPlaya.setOrigin(0,0); 

        //adding text displays for health, defense and cover
        this.add.text(fontPaddingLeft, this.getNextTextHeightPosition(1),"Weapon:",style);
        var weaponDisplay = this.add.image(this.getNextTextHeightPosition(0)+settings.padding, miniMapWidth,'displayPlate')
        weaponDisplay.setOrigin(1,0);
        var weaponIcon = this.add.image(weaponDisplay.x - 155, weaponDisplay.y + settings.padding,'stick');
        weaponIcon.setOrigin(0,0);

        this.add.text(fontPaddingLeft, this.getNextTextHeightPosition(3),"Health:",style);
        var healthDisplay = this.add.image(miniMapWidth,this.getNextTextHeightPosition(2)+settings.padding,'displayPlate')
        healthDisplay.setOrigin(1,0);
        
        this.add.text(fontPaddingLeft, this.getNextTextHeightPosition(5),"Defense:",style);
        var defenseDisplay = this.add.image(miniMapWidth,this.getNextTextHeightPosition(4)+settings.padding,'displayPlate')
        defenseDisplay.setOrigin(1,0);

        this.add.text(fontPaddingLeft, this.getNextTextHeightPosition(7),"Cover:",style);
        var coverDisplay = this.add.image(miniMapWidth,this.getNextTextHeightPosition(6)+settings.padding,'displayPlate')
        coverDisplay.setOrigin(1,0);

        var info = this.add.text(fontPaddingLeft, this.getNextTextHeightPosition(9),defaultInfo,style);
        
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