import "phaser";
import { GameScene } from "./gameScene"
import { mapData } from "./map"
var fontSize = 32;
var map = new mapData();

let config:  {
  title: "Mists",
  width: number,
  height: number,
  parent: "game",
  backgroundColor: "#18216D"
  scene: [GameScene]
  physics: {
    default : "arcade", 
    arcade: {
      debug:false
    }
  }
};
export class MistsGame extends Phaser.Game {
  constructor(config: any) {
    super(config);
  }
}
window.onload = () => {
  config.width = map.screenWidth();
  config.height = map.screenHeight();
  var game = new MistsGame(config);
};