import "phaser";

let config:  {
  title: "Mists",
  width: 800,
  height: 600,
  parent: "game",
  backgroundColor: "#18216D"
};
export class MistsGame extends Phaser.Game {
  constructor(config: any) {
    super(config);
  }
}
window.onload = () => {
  var game = new MistsGame(config);
};