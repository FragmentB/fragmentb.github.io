import { weapon } from "./weapons";
import { armor } from "./armors";

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
