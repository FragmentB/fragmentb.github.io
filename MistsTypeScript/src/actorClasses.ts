import { weapon } from "./weapons";
import { armor } from "./armors";
import { settings } from "./gameSettings";

export class actor{
    
    x:number;
    y:number;
    miniX:number;
    miniY:number;
    facing:direction;
    pause:boolean;
    v:boolean;
    hunt:number;
    character:character;

    getMiniMapPosition(): Array<number>
    {
        var coords = new Array<number>();
        var x = (this.miniX * settings.tileSize) + settings.padding;
        var y =  (this.miniY * settings.tileSize) + settings.padding;
        coords.push(x);
        coords.push(y);

        return coords
    }

    getMainMapPosition(): Array<number>
    {
        var coords = new Array<number>();
        var x = (this.x * settings.tileSize) + (settings.padding * 2);
        var y =  (this.y * settings.tileSize) + settings.padding;
        coords.push(x);
        coords.push(y);

        return coords
    }
}

export class character{
    maxHP:number;
    currentHP:number;
    damage: number;
    defense: number;
    swim:boolean;
    luck:number;
    name:string;
    imageName:string;
    weapon:weapon;
    armor:armor;    
}

export enum direction{
    "Up", "Down", "Left", "Right"
}
