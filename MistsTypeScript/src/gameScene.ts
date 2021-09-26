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

        var style = {font: settings.fontSize+"px monospace", fill:"#000"};
        var defaultInfo = "Welcome to the Mists";
        var fontPaddingLeft = settings.padding * 2;
        var miniMapWidth = settings.miniCols * settings.tileSize
        var miniMapHeight = settings.miniRows * settings.tileSize

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
        var weaponDisplay = this.add.image(miniMapWidth, miniMapHeight + settings.padding,'displayPlate')
        weaponDisplay.setOrigin(1,0);
        var weaponIcon = this.add.image(weaponDisplay.x - 155, weaponDisplay.y + settings.padding,'stick');
        weaponIcon.setOrigin(0,0);
        var weaponName = this.add.text(weaponIcon.x + settings.padding,weaponIcon.y,stick.name, style)
        weaponName.setOrigin(0.0);
        var weaponRange = this.add.text(weaponName.x ,weaponName.y + 2 ,"R: " + stick.range.toString())
        weaponRange.setOrigin(0.0);
        var weaponDamage = this.add.text(weaponRange.x + weaponRange.width + settings.padding, weaponRange.y ,"D: " + stick.damage.toString())
        weaponDamage.setOrigin(0.0);
        
        this.add.text(fontPaddingLeft, this.getNextTextHeightPosition(3),"Health:",style);
        var healthDisplay = this.add.image(miniMapWidth,weaponDisplay.y + weaponDisplay.height + settings.padding,'displayPlate')
        healthDisplay.setOrigin(1,0);
        
        this.add.text(fontPaddingLeft, this.getNextTextHeightPosition(5),"Defense:",style);
        var defenseDisplay = this.add.image(miniMapWidth,healthDisplay.y + healthDisplay.height + settings.padding,'displayPlate')
        defenseDisplay.setOrigin(1,0);

        this.add.text(fontPaddingLeft, this.getNextTextHeightPosition(7),"Cover:",style);
        var coverDisplay = this.add.image(miniMapWidth,defenseDisplay.y + defenseDisplay.height + settings.padding,'displayPlate')
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
    getNextDisplayPlateHeightPosition(factor:number):number{
        var miniMapHeight = settings.miniRows * settings.tileSize
        var padding = settings.padding * factor;
        var currentHeight = 45 * factor-1;
        var height = miniMapHeight + padding + currentHeight;

        return height;
    }

    
}