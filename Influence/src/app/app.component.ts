import { Component, OnInit, OnDestroy } from '@angular/core';
import 'phaser';

var config = {
  type: Phaser.AUTO,
  width: 960,
  height: 1280,
  scene: {
      preload: preload,
      create: create,
      update: update
  }
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Influence';

  gam: Phaser.Game;

  constructor() {
   }

  ngOnInit() {
    this.gam = new Phaser.Game(config);
  }

  ngOnDestroy() {
    this.gam.destroy(true);
  }
}

function preload() {
  this.load.image('welcome', './assets/welcome.jpg');
  }

  function create() {
    this.add.image(480, 640, 'welcome');
  }

  function update() {
  }
