class gameSettings
{
    //map structure
    miniRows: number;
    miniCols: number;
    mapRows: number;
    mapCols: number;
    tileSize : number;
    tilesetCols: number;
}

export const settings : gameSettings =
{
    mapCols:10,
    mapRows:10,
    tileSize:32,
    miniCols:5,
    miniRows:5,
    tilesetCols:3
}