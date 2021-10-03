import "phaser";
import { mapData } from "./map"
import { settings } from "./gameSettings";
import { stick } from "./weapons";
import { cloth } from "./armors";
import { grass } from "./mapClasses";
import { playerData } from "./player";

export class GameScene extends Phaser.Scene{

    map: mapData;
    screen: Screen;
    player: playerData;

    constructor(){
        super({
            key: "GameScene"
        });
    }

    init(params): void{
        this.map = new mapData();
        this.player = new playerData();
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
        this.player.initPlayer();
        
        var scale = settings.tileSize/settings.tilesetSize;
        var style = {font: settings.fontSize+"px monospace", fill:"#fff"};
        var darkStyle = {font: settings.fontSize+"px monospace", fill:"#000"};;       
        var defaultInfo = "Welcome to the Mists brave explorer. Scavenge what you can, but don't get killed.";
        var miniMapWidth = settings.miniCols * settings.tileSize;
        var miniMapHeight = settings.miniRows * settings.tileSize;
        var escapeCoords = this.player.mainPlayer.getMiniMapPosition();
        var miniCoords = escapeCoords;
        var initPosition =  this.player.mainPlayer.getMainMapPosition();
        var playerMainPosition = initPosition;
        var mapToLoad = this.map.getMapNumber(this.player.mainPlayer);

        const miniMap = this.make.tilemap({data:this.map.getMiniMapTileArray(), tileHeight:settings.tilesetSize, tileWidth:settings.tilesetSize});
        miniMap.addTilesetImage('tiles');

        const bigMap = this.make.tilemap({data:this.map.getMainMapTileArray(mapToLoad), tileHeight:settings.tilesetSize, tileWidth:settings.tilesetSize});
        bigMap.addTilesetImage('tiles');      

        const miniMapBottom = miniMap.createLayer(0,'tiles',settings.padding,settings.padding);
        miniMapBottom.setScale(scale,scale);

        const bigMapBottom = bigMap.createLayer(0,'tiles', (miniMapWidth + (settings.padding * 2)), settings.padding);
        bigMapBottom.setScale(scale,scale);


        var miniCar = this.add.image(escapeCoords[0],escapeCoords[1],"car");
        miniCar.setOrigin(0,0); 
        miniCar.setScale(2,2);

        var miniPlaya = this.add.image(miniCoords[0], miniCoords[1],"playa");
        miniPlaya.setScale(scale,scale);
        miniPlaya.setOrigin(0,0); 
        
        var mainPlaya = this.add.image(miniMapWidth + playerMainPosition[0], playerMainPosition[1],"playa");
        mainPlaya.setScale(scale,scale);
        mainPlaya.setOrigin(0,0); 
                
        var mainCar = this.add.image(miniMapWidth + initPosition[0], initPosition[1],"car");
        mainCar.setScale(2,2);
        mainCar.setOrigin(0,0);   


        //adding text displays for health, defense and cover
        var weaponDisplay = this.add.image(bigMapBottom.x - settings.padding, miniMapBottom.y + miniMapBottom.displayHeight + settings.padding,'displayPlate')
        weaponDisplay.setScale(2.2,2);
        weaponDisplay.setOrigin(1,0);
        weaponDisplay.setTint(0xEAE5D3);
        var weaponHeader =this.add.text(weaponDisplay.x - (weaponDisplay.displayWidth + (settings.padding * 2)), weaponDisplay.y + (weaponDisplay.displayHeight / 2), "Weapon:",style);
        weaponHeader.setOrigin(1,0.5);
        var weaponIcon = this.add.image(weaponDisplay.x - (weaponDisplay.displayWidth - settings.padding), weaponDisplay.y + settings.padding,'stick');
        weaponIcon.setScale(2,2);
        weaponIcon.setOrigin(0,0);
        var weaponName = this.add.text(weaponIcon.x + weaponIcon.displayWidth + (settings.padding * 2), weaponIcon.y - (settings.padding /2),stick.name, darkStyle)
        weaponName.setOrigin(0.0);
        var weaponRange = this.add.text(weaponName.x ,weaponName.y + weaponName.displayHeight ,"Rng:" + stick.range.toString(), darkStyle)
        weaponRange.setOrigin(0.0);
        var weaponDamage = this.add.text(weaponRange.x + weaponRange.displayWidth + (settings.padding * 2), weaponRange.y ,"Dmg:" + stick.damage.toString(),darkStyle)
        weaponDamage.setOrigin(0.0);
        
        var healthDisplay = this.add.image(weaponDisplay.x,weaponDisplay.y + (weaponDisplay.displayHeight) + settings.padding,'displayPlate')
        healthDisplay.setScale(2.2,2);
        healthDisplay.setOrigin(1,0);
        healthDisplay.setTint(0xEAE5D3);
        var healthHeader =this.add.text(healthDisplay.x - (healthDisplay.displayWidth + (settings.padding * 2)), healthDisplay.y + (healthDisplay.displayHeight / 2), "Health:",style);
        healthHeader.setOrigin(1,0.5);
        for (var h = 0, hScale = 2; h < this.player.mainPlayer.character.currentHP; h++){
            
            if(this.player.mainPlayer.character.currentHP <6)
                hScale = 2;
            this.add.image(healthDisplay.x  - (healthDisplay.displayWidth -(52/hScale )* h), healthDisplay.y + settings.padding - 32 + (32 * Math.max(1, Math.min(Math.ceil(h/9),1))),'heart').setOrigin(0,0).setScale(hScale,hScale);
        };

        
        var defenseDisplay = this.add.image(healthDisplay.x ,healthDisplay.y + (healthDisplay.displayHeight) + settings.padding,'displayPlate');
        defenseDisplay.setScale(2.2,2);
        defenseDisplay.setOrigin(1,0);
        defenseDisplay.setTint(0xEAE5D3);
        var defenseHeader =this.add.text(defenseDisplay.x - (defenseDisplay.displayWidth + (settings.padding * 2)), defenseDisplay.y + (defenseDisplay.displayHeight / 2), "Defense:",style);
        defenseHeader.setOrigin(1,0.5);
        var armorIcon = this.add.image(defenseDisplay.x - (defenseDisplay.displayWidth - settings.padding), defenseDisplay.y + settings.padding,'cloth');
        armorIcon.setScale(2,2);
        armorIcon.setOrigin(0,0);
        var armorName = this.add.text(armorIcon.x + armorIcon.displayWidth + (settings.padding * 2), armorIcon.y - (settings.padding /2),cloth.name, darkStyle)
        armorName.setOrigin(0.0);
        var armorDefense = this.add.text(armorName.x ,armorName.y + armorName.displayHeight ,"Defense:" + cloth.defense.toString(), darkStyle)
        armorDefense.setOrigin(0.0);

        var coverDisplay = this.add.image(defenseDisplay.x ,defenseDisplay.y + (defenseDisplay.displayHeight) + settings.padding,'displayPlate')
        coverDisplay.setScale(2.2,2);
        coverDisplay.setOrigin(1,0);
        coverDisplay.setTint(0xEAE5D3);
        var coverHeader =this.add.text(coverDisplay.x - (coverDisplay.displayWidth + (settings.padding * 2)), coverDisplay.y + (coverDisplay.displayHeight / 2), "Terrain:",style);
        coverHeader.setOrigin(1,0.5);
        
        
        var currentCover = this.map.getSpecificTile(this.player.mainPlayer);
        var temp = new Array<Array<number>>();
        var temp2 = new Array<number>();
        
        temp2.push(currentCover.tileNumber);
        temp.push(temp2);
        
        var coverMap = this.make.tilemap({key:"cover",data:temp, tileHeight:settings.tilesetSize, tileWidth:settings.tilesetSize});
        coverMap.addTilesetImage('tiles');
        var coverIcon = coverMap.createLayer(0,'tiles', coverDisplay.x - (coverDisplay.displayWidth - settings.padding), coverDisplay.y + settings.padding);
        coverIcon.setOrigin(0,0);
        coverIcon.setScale(scale,scale);
                
        var coverName = this.add.text(coverIcon.x + (settings.tilesetSize * scale) + (settings.padding * 2), coverIcon.y - (settings.padding /2),currentCover.name, darkStyle)
        coverName.setOrigin(0.0);
        var coverDefense = this.add.text(coverName.x ,coverName.y + coverName.displayHeight ,"Cover:" + currentCover.cover.toString(), darkStyle)
        coverDefense.setOrigin(0.0);

        var infoDisplay = this.add.image(coverDisplay.x ,coverDisplay.y + (coverDisplay.displayHeight) + settings.padding,'displayPlate');
        infoDisplay.setScale(3.2,3);
        infoDisplay.setOrigin(1,0);
        infoDisplay.setTint(0xEAE5D3);

        var info = this.add.text((settings.padding *3), infoDisplay.y + settings.padding,"",darkStyle);
        info.setWordWrapWidth(miniMapWidth-(settings.padding * 2));
        info.setOrigin(0,0);
        info.text = defaultInfo;
        }

    update(time):void{
        //TODO
    }


    drawMap():void{
        
    }
}