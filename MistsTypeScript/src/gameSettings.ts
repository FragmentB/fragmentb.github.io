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
    mapCols:15,
    mapRows:15,
    tileSize:32,
    miniCols:8,
    miniRows:8,
    tilesetCols:3
}