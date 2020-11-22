export class lrgMapObj {
    x:number;
    y:number;
    symbol:string;
    innerMap:Array<mapTile>;
    visited:boolean;
    image:string;
}

export class mapTile{
    x:number;
    y:number;
    tile:tile;
}
export class tile {
    symbol: string;
    passable: boolean;
    swimmable: boolean;
    blocksSight:boolean   
    image: string;
    cover: number;
    name: string;   
}

export const floor : tile = {
    symbol:'-',
    passable:true,
    swimmable:false,
    blocksSight:false,
    image:"",
    cover:0,
    name:"Floor"
}

export const water : tile = {
    symbol:'w',
    passable:true,
    swimmable:true,
    blocksSight:false,
    image:"",
    cover:4,
    name:"Water"
}

export const waterRubble : tile = {
    symbol:'m',
    passable:true,
    swimmable:true,
    blocksSight:false,
    image:"",
    cover:4,
    name:"WaterRubble"
}

export const tree : tile = {
    symbol:'%',
    passable:true,
    swimmable:false,
    blocksSight:true,
    image:"",
    cover:3,
    name:"Tree"
}

export const bush : tile = {
    symbol:'*',
    passable:true,
    swimmable:false,
    blocksSight:false,
    image:"",
    cover:1,
    name:"Bush"
}

export const nest : tile = {
    symbol:'N',
    passable:true,
    swimmable:false,
    blocksSight:false,
    image:"",
    cover:2,
    name:"Nest"
}

export const grass : tile = {
    symbol:'.',
    passable:true,
    swimmable:false,
    blocksSight:false,
    image:"",
    cover:1,
    name:"Grass"
}

export const box : tile = {
    symbol:'B',
    passable:true,
    swimmable:false,
    blocksSight:false,
    image:"",
    cover:2,
    name:"Box"
}

export const wall : tile = {
    symbol:'#',
    passable:false,
    swimmable:false,
    blocksSight:true,
    image:"",
    cover:0,
    name:"Wall"
}

export const door : tile = {
    symbol:'D',
    passable:true,
    swimmable:false,
    blocksSight:true,
    image:"",
    cover:3,
    name:"Door"
}

export const rubble : tile = {
    symbol:'R',
    passable:true,
    swimmable:false,
    blocksSight:false,
    image:"",
    cover:1,
    name:"Rubble"
}