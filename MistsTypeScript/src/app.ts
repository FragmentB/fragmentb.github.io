import "phaser";
import { GameScene } from "./gameScene"
import { mapStuct } from "./mapClasses"
import GameConfig = Phaser.Types.Core.GameConfig;

var fontSize = 32;


let config: GameConfig = {
  title: "Mists",
  parent: "game",
  backgroundColor: "#18216D",
  scene: [GameScene],
  physics: {
    default : "arcade", 
    arcade: {
      debug:false
    }
  }
};

export class MistsGame extends Phaser.Game {
  constructor(config: GameConfig) {
    super(config);
  }
}
window.onload = () => {
  config.width = (mapStuct.miniCols * mapStuct.tileSize) + 10 + (mapStuct.mapCols * mapStuct.tileSize);
  config.height = (mapStuct.miniRows * mapStuct.tileSize) + (mapStuct.mapRows * mapStuct.tileSize);
  var game = new MistsGame(config);
};