import "phaser";
import { mapData } from "./map"
import { settings } from "./gameSettings";
import { stick } from "./weapons";
import { cloth } from "./armors";
import { grass } from "./mapClasses";
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
        this.load.image("car","src/Images/tempVehicle.png");
        this.load.image("displayPlate","src/Images/tempPlate.png");
        this.load.image("heart","src/Images/heart.png");
        this.load.image("stick", stick.image);
        this.load.image("cloth", cloth.image);
    }

    create():void{
        this.map.initMap();

        const miniMap = this.make.tilemap({data:this.map.getMiniMapTileArray(), tileHeight:settings.tilesetSize, tileWidth:settings.tilesetSize});
        miniMap.addTilesetImage('tiles');

        const bigMap = this.make.tilemap({data:this.map.getMainMapTileArray(0), tileHeight:settings.tilesetSize, tileWidth:settings.tilesetSize});
        bigMap.addTilesetImage('tiles');
         
        
        var scale = settings.tileSize/settings.tilesetSize;

        var style = {font: settings.fontSize+"px monospace", fill:"#fff"};
        var darkStyle = {font: settings.fontSize+"px monospace", fill:"#000"};;
        
        var defaultInfo = "Welcome to the Mists";
        var miniMapWidth = settings.miniCols * settings.tileSize;
        var miniMapHeight = settings.miniRows * settings.tileSize;

        const miniMapBottom = miniMap.createLayer(0,'tiles',settings.padding,settings.padding);
        miniMapBottom.setScale(scale,scale);

        const bigMapBottom = bigMap.createLayer(0,'tiles', (miniMapWidth + (settings.padding * 2)), settings.padding);
        bigMapBottom.setScale(scale,scale);

        var miniCar = this.add.image(settings.padding,settings.padding,"car");
        miniCar.setOrigin(0,0); 

        var miniPlaya = this.add.image(settings.padding,settings.padding,"playa");
        miniPlaya.setScale(scale,scale);
        miniPlaya.setOrigin(0,0); 
        
        var mainPlaya = this.add.image(miniMapWidth + (settings.padding * 2),settings.padding,"playa");
        mainPlaya.setScale(scale,scale);
        mainPlaya.setOrigin(0,0); 
                
        var maincar = this.add.image(miniMapWidth + (settings.tileSize) + (settings.padding * 2),settings.padding,"car");
        maincar.setOrigin(0,0);   


        //adding text displays for health, defense and cover
        var weaponDisplay = this.add.image(bigMapBottom.x - settings.padding, miniMapBottom.y + miniMapBottom.displayHeight + settings.padding,'displayPlate')
        weaponDisplay.setOrigin(1,0);
        var weaponHeader =this.add.text(weaponDisplay.x - (weaponDisplay.width + (settings.padding * 2)), weaponDisplay.y + (weaponDisplay.height / 2), "Weapon:",style);
        weaponHeader.setOrigin(1,0.5);
        var weaponIcon = this.add.image(weaponDisplay.x - (weaponDisplay.width - settings.padding), weaponDisplay.y + settings.padding,'stick');
        weaponIcon.setOrigin(0,0);
        var weaponName = this.add.text(weaponIcon.x + weaponIcon.width + (settings.padding * 2), weaponIcon.y - (settings.padding /2),stick.name, darkStyle)
        weaponName.setOrigin(0.0);
        var weaponRange = this.add.text(weaponName.x ,weaponName.y + weaponName.height ,"Rng:" + stick.range.toString(), darkStyle)
        weaponRange.setOrigin(0.0);
        var weaponDamage = this.add.text(weaponRange.x + weaponRange.width + (settings.padding * 2), weaponRange.y ,"Dmg:" + stick.damage.toString(),darkStyle)
        weaponDamage.setOrigin(0.0);
        
        var healthDisplay = this.add.image(weaponDisplay.x,weaponDisplay.y + weaponDisplay.height + settings.padding,'displayPlate')
        healthDisplay.setOrigin(1,0);
        var healthHeader =this.add.text(healthDisplay.x - (healthDisplay.width + (settings.padding * 2)), healthDisplay.y + (healthDisplay.height / 2), "Health:",style);
        healthHeader.setOrigin(1,0.5);
        for (var h = 0; h < 5; h++){
            this.add.image(healthDisplay.x - (((healthDisplay.width)-16)-32*h), healthDisplay.y + ((healthDisplay.height / 2)),'heart');
        };

        
        var defenseDisplay = this.add.image(healthDisplay.x ,healthDisplay.y + healthDisplay.height + settings.padding,'displayPlate');
        defenseDisplay.setOrigin(1,0);
        var defenseHeader =this.add.text(defenseDisplay.x - (defenseDisplay.width + (settings.padding * 2)), defenseDisplay.y + (defenseDisplay.height / 2), "Defense:",style);
        defenseHeader.setOrigin(1,0.5);
        var armorIcon = this.add.image(defenseDisplay.x - (defenseDisplay.width - settings.padding), defenseDisplay.y + settings.padding,'cloth');
        armorIcon.setOrigin(0,0);
        var armorName = this.add.text(armorIcon.x + armorIcon.width + (settings.padding * 2), armorIcon.y - (settings.padding /2),cloth.name, darkStyle)
        armorName.setOrigin(0.0);
        var armorDefense = this.add.text(armorName.x ,armorName.y + armorName.height ,"Defense:" + cloth.defense.toString(), darkStyle)
        armorDefense.setOrigin(0.0);

        var coverDisplay = this.add.image(defenseDisplay.x ,defenseDisplay.y + defenseDisplay.height + settings.padding,'displayPlate')
        coverDisplay.setOrigin(1,0);
        var coverHeader =this.add.text(coverDisplay.x - (coverDisplay.width + (settings.padding * 2)), coverDisplay.y + (coverDisplay.height / 2), "Terrain:",style);
        coverHeader.setOrigin(1,0.5);
        
        
        var coverIcon = this.add.image(coverDisplay.x - (coverDisplay.width - settings.padding), coverDisplay.y + settings.padding,"tiles");
        coverIcon.setCrop(0,0,16,16);
        coverIcon.setOrigin(0,0);
        coverIcon.setScale(scale,scale);
        
        var coverName = this.add.text(coverIcon.x + (settings.tilesetSize * scale) + (settings.padding * 2), coverIcon.y - (settings.padding /2),grass.name, darkStyle)
        coverName.setOrigin(0.0);
        var coverDefense = this.add.text(coverName.x ,coverName.y + coverName.height ,"Cover:" + grass.cover.toString(), darkStyle)
        coverDefense.setOrigin(0.0);

        var infoDisplay = this.add.image(coverDisplay.x ,coverDisplay.y + coverDisplay.height + settings.padding,'displayPlate');
        infoDisplay.setScale(1.6,1.2);
        infoDisplay.setOrigin(1,0);

        var info = this.add.text((settings.padding *3), infoDisplay.y + (infoDisplay.height/2) - settings.padding,"",darkStyle);
        info.setOrigin(0,0);
        info.text = defaultInfo;
        }

    update(time):void{
        //TODO
    }


    drawMap():void{
        
    }
}