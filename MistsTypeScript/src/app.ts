import "phaser";
import { GameScene } from "./gameScene"
import { settings } from "./gameSettings";
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
  config.width = (settings.miniCols * settings.tileSize) + (settings.padding * 3) + (settings.mapCols * settings.tileSize);
  config.height = (settings.mapRows * settings.tileSize) + (settings.padding * 2);
  var game = new MistsGame(config);
};