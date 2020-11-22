import "phaser";
import { GameScene } from "./gameScene"
import { mapData } from "./map"
var fontSize = 32;
var map = new mapData();

let config: Phaser.Types.Core.GameConfig = {
  title: "Mists",
  width: 600,
  height: 800,
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
  constructor(config: Phaser.Types.Core.GameConfig) {
    config.width = map.screenWidth();
    config.height = map.screenHeight();
    super(config);
  }
}
window.onload = () => {
  
  var game = new MistsGame(config);
};


