// tslint:disable-next-line: max-line-length
// Helpful command for angular building ng build --prod --output-path ../InfluenceDist  --base-href "https://fragmentb.github.io/InfluenceDist/"

import { Component, OnInit, OnDestroy } from '@angular/core';
import 'phaser';

let config = {
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
