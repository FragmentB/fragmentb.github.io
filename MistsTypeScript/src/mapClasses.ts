export class lrgMapObj {
    x:number;
    y:number;
    symbol:string;
    innerMap:Array<mapTile>;
    visited:boolean;
    tileNumber:number;
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
    tileRow: number;
    tileNumber: number
    cover: number;
    name: string;   
}

export const grass : tile = {
    symbol:'.',
    passable:true,
    swimmable:false,
    blocksSight:false,
    tileRow:0,
    tileNumber:0,
    cover:1,
    name:"Grass"
}

export const floor : tile = {
    symbol:'-',
    passable:true,
    swimmable:false,
    blocksSight:false,
    tileRow:1,
    tileNumber:0,
    cover:0,
    name:"Floor"
}

export const water : tile = {
    symbol:'w',
    passable:true,
    swimmable:true,
    blocksSight:false,
    tileRow:2,
    tileNumber:0,
    cover:4,
    name:"Water"
}

export const waterRubble : tile = {
    symbol:'m',
    passable:true,
    swimmable:true,
    blocksSight:false,
    tileRow:3,
    tileNumber:0,
    cover:4,
    name:"WaterRubble"
}

export const tree : tile = {
    symbol:'%',
    passable:true,
    swimmable:false,
    blocksSight:true,
    tileRow:4,
    tileNumber:0,
    cover:3,
    name:"Tree"
}

export const bush : tile = {
    symbol:'*',
    passable:true,
    swimmable:false,
    blocksSight:false,
    tileRow:5,
    tileNumber:0,
    cover:1,
    name:"Rock"
}

export const nest : tile = {
    symbol:'N',
    passable:true,
    swimmable:false,
    blocksSight:false,
    tileRow:6,
    tileNumber:0,
    cover:2,
    name:"Nest"
}

export const box : tile = {
    symbol:'B',
    passable:true,
    swimmable:false,
    blocksSight:false,
    tileRow:7,
    tileNumber:0,
    cover:2,
    name:"Box"
}

export const wall : tile = {
    symbol:'#',
    passable:false,
    swimmable:false,
    blocksSight:true,
    tileRow:8,
    tileNumber:0,
    cover:0,
    name:"Wall"
}

export const door : tile = {
    symbol:'D',
    passable:true,
    swimmable:false,
    blocksSight:true,
    tileRow:9,
    tileNumber:0,
    cover:3,
    name:"Door"
}

export const rubble : tile = {
    symbol:'R',
    passable:true,
    swimmable:false,
    blocksSight:false,
    tileRow:10,
    tileNumber:0,
    cover:1,
    name:"Rubble"
}
class mapStructure
{
    //map structure
    miniRows: number;
    miniCols: number;
    mapRows: number;
    mapCols: number;
    tileSize : number;
}

export const mapStuct : mapStructure =
{
    mapCols:10,
    mapRows:10,
    tileSize:32,
    miniCols:5,
    miniRows:5
}