import { actor, character, direction } from "./actorClasses";
import { cloth } from "./armors";
import { settings } from "./gameSettings";
import { tools } from "./tools";
import { stick } from "./weapons";

export class playerData{
    toolkit = new tools();
    mainPlayer = new actor();

    initPlayer(){
        var player= new actor();
        var playerCharacter = new character();
        playerCharacter.armor = cloth;
        playerCharacter.weapon = stick;
        playerCharacter.currentHP = 5;
        playerCharacter.maxHP = 5;
        playerCharacter.damage = 1;
        playerCharacter.defense = 1;
        playerCharacter.luck = 1;
        playerCharacter.swim = false;
        playerCharacter.name = "Playa";
        playerCharacter.imageName = "src/Images/tempPlayer.png";

        player.character = playerCharacter;
        player.x = 0;
        player.y = 0;
        player.miniX = 0;
        player.miniY = 0;
        player.hunt = 0;
        player.v = true;
        player.pause = false;       

        var temp = this.toolkit.randomInt(9,1);

        switch (temp)
        {
            case 1:
            case 2:
                player.miniY = this.toolkit.randomInt(settings.miniRows-1,0);
                player.y = this.toolkit.randomInt(settings.mapRows-1,0);
                player.facing= direction.Right;
                break;
            case 3:
            case 4:
                player.miniX = settings.miniCols-1;
                player.x = settings.mapCols-1;
                player.miniY = this.toolkit.randomInt(settings.miniRows-1,0);
                player.y = this.toolkit.randomInt(settings.mapRows-1,0);
                player.facing= direction.Left;
                break;
            case 5:
            case 6:
                player.miniX = this.toolkit.randomInt(settings.miniCols-1,0);
                player.x = this.toolkit.randomInt(settings.mapCols-1,0);
                player.facing= direction.Down;
                break;
            case 7:
            case 8:
            case 9:
                player.miniX = this.toolkit.randomInt(settings.miniRows-1,0);
                player.miniY = settings.miniRows-1;
                player.y = settings.mapRows - 1;
                player.x = this.toolkit.randomInt(settings.mapCols-1,0);
                player.facing= direction.Up;
                break; 
        }
        
        this.mainPlayer = player;

    }


    getMiniMapPosition(): Array<number>
    {
        var coords = new Array<number>();
        var x = (this.mainPlayer.miniX * settings.tileSize) + settings.padding;
        var y =  (this.mainPlayer.miniY * settings.tileSize) + settings.padding;
        coords.push(x);
        coords.push(y);

        return coords
    }

    getMainMapPosition(): Array<number>
    {
        var coords = new Array<number>();
        var x = (this.mainPlayer.x * settings.tileSize) + (settings.padding * 2);
        var y =  (this.mainPlayer.y * settings.tileSize) + settings.padding;
        coords.push(x);
        coords.push(y);

        return coords
    }
    
}